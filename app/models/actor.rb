require 'utility'

class Actor
  include Mongoid::Document
  include Mongoid::Timestamps
  
  # Relations
  belongs_to   :app, index: true
  belongs_to   :account, index: true

  has_many     :events,   :dependent => :destroy
  has_many     :identifiers,  :dependent => :destroy

  field :meta, type: Boolean,     default: false

  # Attributes
  validates_presence_of :account_id, :app_id

  index({app_id: -1, _id: -1})
  index({account_id: -1, _id: -1})

  # NOTE
  ## all values of description hash is array, as an actor can have many values of same property
  ## {
  ##     profile: {
  ##        "name" => ["John Doe",]  
  ##        "email" => ["john@doe.com"]
  ##     },
  ##     system: {
  ##        "browser" => ["mozilla", "chrom"],
  ##        "os" => ["mac", "ios"]
  ##     }
  ## }
  field       :description, type:    Hash,      :default => {profile: {}, system:{}} # can be empty 

  # Function  

  # NOTE
  ## Uniqly identify an actor..
  ## If not set an auto unique id is assigned to actor
  ## Also If not set, then for example a user coming from mobile and PC
  ## will be identified as two different user.
  ## Identiy Any unique id which business want - email or any other id

  # INPUT => 
  ## {
  ##   id:  "23232323",             [OPTIONAL]  ## if not give anonymous actor is created and
  ##                                            ## if uid is not already existing in app_id then
  ##                                            ## the uid is assigned to anonymous actor otherwise  
  ##                                            ## actor_id of assigned actor is return
  ##   account_id:  '1222343'       [MANDATORY]
  ##   app_id:  "1234444',          [MANDATORY]
  ##   uid:  "john.doe@example.com" [MANDATORY]
  ##   type:  "mobile"              [OPTIONAL]
  ## }

  # OUTPUT => {:return => actor_id, :error => nil}
  def self.identify(params)
    Rails.logger.info("Enter Actor Identify")

    if params[:app_id].blank? or params[:account_id].blank? or params[:uid].blank? 
      raise et("actor.invalid_argument_in_identify") 
    end

    app = App.where(account_id: params[:account_id], _id: params[:app_id] ).first
    raise et("actor.invalid_app_id", id: params[:app_id]) if app.blank?

    actor_id = nil

    # check if this user exists already
    identifier = Identifier.where(app_id: params[:app_id], uid: params[:uid]).first

    # its a case when identity is called more than once in a session
    # we should treat it as different person because in this case identify should be called with actor_id nil as  
    # actor_id is identified with other uid earlier.. This will be tracked by cookie on client
    if params[:id].blank?
      # if this is new actor
      if identifier.blank?
        actor = Actor.create!(account_id: params[:account_id], app_id: params[:app_id])
        actor.identifiers.create!(account_id: params[:account_id], app_id: params[:app_id], uid: params[:uid])
        Rails.logger.info("creating new actor and new identifier for #{params[:uid]}")
      
      else
        actor = Actor.where(app_id: params[:app_id], _id: identifier.actor_id).first 
        raise et("actor.invalid_actor_id", id: "") if actor.blank?   #dont leak out identifier.actor_id

        Rails.logger.info("Identifier #{params[:uid]} exists so returning the associated actor")
      end
      actor_id = actor._id
    else
      actor = Actor.where(app_id: params[:app_id], _id: params[:id]).first 
      raise et("actor.invalid_actor_id", id: params[:id]) if actor.blank?

      # create Identifier for the actor
      if identifier.blank?
        identifier = Identifier.create!(account_id: params[:account_id], app_id: params[:app_id], actor_id: params[:id], uid: params[:uid], type: params[:type])
        Rails.logger.info("Creating Identifier #{params[:uid]} for actor #{params[:id]}")
      else    
        
        if identifier.actor_id != params[:id]
          if actor.identifiers.blank?
            Rails.logger.info("Identifier already exists..Re-mapping anonymous actor to Identifier #{params[:uid]}")
                
            raise et("actor.remap_failed") if !actor.remap_to(identifier.actor_id)[:error].blank?
          else
            raise et("actor.already_in_use", uid: params[:uid] ) 
          end
        end        
      end
      actor_id = identifier.actor_id
    end
    {:return => actor_id, :error => nil}
  rescue => e
    Rails.logger.error("**** ERROR **** #{er(e)}")
    {:return => nil, :error => e}
  end


  # NOTE
  ## set the property of actor explicitly
  ## It sets both System property of Actor and Profile Properties of actor
  ## System Property - describes browser, location, OS etc auto extracted by rulebot script
  ## Profile Property - describes property of actor which a business want to set like "gender", "dob" etc

  # INPUT
  ## {
  ##  :id => "1223343",       [MANDATORY]  
  ##  :account_id =>'2121121' [MANDATORY]
  ##  :app_id => "1234444',   [MANDATORY]
  ##  :properties =>          [MANDATORY] ## either system or profile property must be there
  ##     {        
  ##        profile: {
  ##          :email => "john.doe@example.com",
  ##          :customer => {:address => {:city => "Bangalore"}}}
  ##        }
  ##        system: {
  ##          :browser => "chrome"
  ##        }
  ##     }
  ##
  ## }

  # OUTPUT => {:return => object, :error => nil}

  def self.set(params)
    Rails.logger.info("Enter Actor Set")

    if params[:account_id].blank? or params[:app_id].blank? or  params[:id].blank? or
     ( params[:properties][:profile].blank? and params[:properties][:system].blank? )
      raise et("actor.invalid_argument_in_set") 
    end

    app = App.where(account_id: params[:account_id], _id: params[:app_id] ).first
    raise et("actor.invalid_app_id", id: params[:app_id]) if app.blank?
    
    params[:meta] =  true

    # First get the actor
    actor = Actor.where(app_id: params[:app_id], _id: params[:id]).first 
    raise et("actor.invalid_actor_id", id: params[:id]) if actor.blank?

    properties = params[:properties]
    params.delete(:properties)

    properties.each do |k,v|
      # k is profile or system
      k = k.to_s

      # save event
      params[:name] = AppConstants.send("event_set_actor_#{k.to_s}")
      params[:properties] = v
      params[:property_type] = k
      ret = Event.add!(params)

      raise ret[:error] if !ret[:error].blank?

      desc = Utility.serialize_to(hash: params[:properties], serialize_to: "value")    

      # key is like "customer[address][city]", value is like "Bangalore"
      desc.each do |key,value|
        actor.description[k][key] = [] if actor.description[k][key].blank?
        actor.description[k][key] << value
      end
    end

    Rails.logger.info("Saving Actor Description")
    actor.save!

    {:return => actor, :error => nil}
  rescue => e
    Rails.logger.error("**** ERROR **** #{er(e)}")
    {:return => false, :error => e}
  end

  # NOTE
  ## set a new identifier(alias) of actor

  # INPUT
  ## {
  ##   account_id: "123436456"       [MANDATORY]
  ##   app_id: "1234444',            [MANDATORY]
  ##   uid: "john.doe@example.com",  [MANDATORY]
  ##   new_uid: "+1-9911231234"      [MANDATORY]
  ##   type:  "mobile"               [OPTIONAL]
  ## }

  # OUTPUT => {:return => true, :error => nil}
  def self.alias(params)
    Rails.logger.info("Enter Actor Alias")

    if params[:account_id].blank? or params[:app_id].blank? or 
       params[:uid].blank? or params[:new_uid].blank?
      raise et("actor.invalid_argument_in_alias")
    end

    app = App.where(account_id: params[:account_id], _id: params[:app_id] ).first
    raise et("actor.invalid_app_id", id: params[:app_id]) if app.blank?

    # check if this user exists already
    uid = Identifier.where(app_id: params[:app_id], uid: params[:uid] ).first
    raise et("actor.no_uid", uid: params[:uid], app_id: params[:app_id]) if uid.blank? 

    # check if Identifier is already exists
    a = Identifier.where(app_id: params[:app_id], uid: params[:new_uid]).first
    
    if a.blank?   
      Identifier.create!(account_id: params[:account_id], app_id: params[:app_id], actor_id: uid.actor_id, uid: params[:new_uid], type: params[:type] )
    else
      raise et("actor.identifier_already_exist", identifier: params[:new_uid], actor_id: a.actor_id) if uid.actor_id != a.actor_id
      Rails.logger.info("#{params[:uid]} and #{params[:new_uid]} already aliased")
    end

    {:return => true, :error => nil}
  rescue => e
    Rails.logger.error("**** ERROR **** #{er(e)} #{params.inspect}")
    {:return => false, :error => e}
  end

  # NOTE
  ## Read Actor Data

  # INPUT
  ## {
  ##   id: "3433434",                [OPTIONAL] 
  ##           OR
  ##   uid: "john.doe@example.com",  [OPTIONAL] 
  ##
  ##   account_id: "23232332"        [MANDATORY]
  ##   app_id: "1234444',            [MANDATORY]
  ##
  ##   identifiers: true or false    [OPTIONAL] # associated identifiers 
  ##   events: true or false         [OPTIONAL] # events 
  ##   conversions: true or false    [OPTIONAL] # conversion
  ##   errors: true or false         [OPTIONAL] # errors
  ## }

  # OUTPUT => {
  ##            account: {id: "232342343"}
  ##            app: {id: "234324"}
  ##
  ##            actor: {id: "3433434", description:  { profile: {  "name": ["John Doe"],   "email": ["john@doe.com"] }, system: {os: ["win", "mac"]}} }
  ##            identifiers: [{"a@b.com" => "email"}, {"9999999" => "mobile"}, {"34433444" => "facebook_uid"}],
  ##
  ##            events: [
  ##                      {
  ##                         id: "3232342434", name: "sign_in", 
  ##                         properties: [{"k" => "name", "v" => "alok"}, {"k" => "address[city]", "v" => "Bangalore"}]
  ##                         time: 2009-02-19 00:00:00 UTC
  ##                      },
  ##                      {...}
  ##                    ],
  ##            conversions: [
  ##                            {
  ##                              id: "32323424355",
  ##                              properties: [{"k" => "button", "v" => "clicked"}, {"k" => "times", "v" => "40"}]
  ##                              time: 2009-02-19 23:00:00 UTC
  ##                            },
  ##                            {...}
  ##                         ],
  ##            errors: [
  ##                       {
  ##                          id: "3232342434",
  ##                          properties: [{"k" => "name", "v" => "Javascript Error"}, {"k" => "reason", "v" => "dont know"}]
  ##                          time: 2009-02-19 21:00:00 UTC
  ##                       },
  ##                       {...}
  ##                    ],
  ##
  ##          }
  def self.read(params)
    Rails.logger.info("Enter Actor Read")

    hash = {identifiers: [], events: [], conversions: [], errors: [] }
    actor_id = nil
    actor = nil

    if params[:account_id].blank? or params[:app_id].blank? or 
      (params[:id].blank? and params[:uid].blank?)
      raise et("actor.invalid_argument_in_read")
    end

    app = App.where(account_id: params[:account_id], _id: params[:app_id] ).first
    raise et("actor.invalid_app_id", id: params[:app_id]) if app.blank?
    
    if params[:id].blank? 
      identifier = Identifier.where(app_id: params[:app_id], uid: params[:uid]).first
      actor_id = identifier.actor_id if !identifier.blank?
    else
      # get the actor
      actor = Actor.where(app_id: params[:app_id], id: params[:id]).first   
      actor_id = actor._id if !actor.blank?
    end
    
    raise et("actor.no_actor") if actor_id.blank?  

    actor = Actor.where(app_id: params[:app_id], _id: actor_id).first if actor.blank?
    raise et("actor.invalid_actor_id", id: actor_id) if actor.blank?

    hash[:account] = {id: actor.account_id.to_s}
    hash[:app] = {id: actor.app_id.to_s} 
    hash[:actor] = actor.format_actor  

    #BLOCKED FOR TIMEBEING
    # if params[:identifiers] == true
    #   ids = Identifier.where(actor_id: actor_id, app_id: params[:app_id]).all
    #   ids.each {|attr| hash[:identifiers] << attr.format_identifier}
    #   Rails.logger.info("Adding Identifiers")
    # end
    
    if params[:events] == true
      events = Event.where(actor_id: actor_id, app_id: params[:app_id], meta: false).limit(AppConstants.limit_events).desc(:_id)
      events.each {|attr| hash[:events] << attr.format_event}
      Rails.logger.info("Adding Events")
    end

    if params[:conversions] == true
      conversions = Conversion.where(actor_id: actor_id, app_id: params[:app_id]).limit(AppConstants.limit_conversions).desc(:_id)
      conversions.each {|attr| hash[:conversions] << attr.format_conversion}
      Rails.logger.info("Adding Conversions")
    end

    if params[:errors] == true
      errors = Err.where(actor_id: actor_id, app_id: params[:app_id]).limit(AppConstants.limit_errors).desc(:_id)
      errors.each {|attr| hash[:errors] << attr.format_err}
      Rails.logger.info("Adding Errors")
    end

    {:return => hash, :error => nil}    
  rescue => e 
    Rails.logger.error("**** ERROR **** #{er(e)}")
    {:return => {}, :error => e}
  end

  # NOTE
  ## Remaps an actor to already existing actor.
  ## Deletes the current actor after remap

  # INPUT 
  ## actor_id = 2344344 (to which remap will happen)

  # OUTPUT 
  ## self or nil
  def remap_to(actor_id)
    Rails.logger.info("Actor Remap #{actor_id}")
    
    Event.where(:actor_id => self._id).update_all(:actor_id => actor_id)
    Identifier.where(:actor_id => self._id).update_all(:actor_id => actor_id)

    self.destroy

    {:return => self, :error => nil}
  rescue => e
    Rails.logger.error("**** ERROR **** #{e.message}")
    {:return => nil, :error => e}
  end

  def format_actor
    {id: self._id.to_s, account_id: self.account_id.to_s, app_id: self.app_id.to_s, description: self.description, time: self.updated_at}
  rescue => e
    Rails.logger.error("**** ERROR **** #{e.message}")
    {}
  end
end
