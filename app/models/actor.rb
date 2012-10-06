class Actor
  include Mongoid::Document
  include Mongoid::Timestamps
  
  # Relations
  belongs_to   :app, index: true
  belongs_to   :account, index: true

  has_many     :events,   :dependent => :destroy
  has_many     :identifiers,  :dependent => :destroy

  # Attributes
  validates_presence_of :account_id, :app_id

  # Function  

  # NOTE
  ## Uniqly identify an actor..
  ## If not set an auto unique id is assigned to actor
  ## Also If not set, then for example a user coming from mobile and PC
  ## will be identified as two different user.
  ## Identiy Any unique id which business want - email or any other id

  # INPUT => 
  ## {
  ##  :account_id => '1222343'       [MANDATORY]
  ##  :app_id => "1234444',          [MANDATORY]
  ##  :actor_id => "23232323",       [OPTIONAL] ## if not give anonymous actor is created and
  ##                                            ## if uid is not already existing in app_id then
  ##                                            ## the uid is assigned to anonymous actor otherwise  
  ##                                            ## actor_id of assigned actor is return
  ##  :uid => "john.doe@example.com" [MANDATORY]
  ## }

  # OUTPUT => {:return => actor_id, :error => nil}
  def self.identify(params)
    Rails.logger.info("Enter Actor Identify")

    if params[:app_id].blank? or params[:account_id].blank? or params[:uid].blank? 
      raise et("actor.invalid_argument_in_identify") 
    end

    actor_id = nil

    # check if this user exists already
    identifier = Identifier.where(app_id: params[:app_id], uid: params[:uid]).first

    # its a case when identity is called more than once in a session
    # we should treat it as different person because in this case identify should be called with actor_id nil as  
    # actor_id is identified with other uid earlier.. This will be tracked by cookie on client
    if params[:actor_id].blank?
      # if this is new actor
      if identifier.blank?
        actor = Actor.create!(account_id: params[:account_id], app_id: params[:app_id])
        actor.identifiers.create!(account_id: params[:account_id], app_id: params[:app_id], uid: params[:uid])
        Rails.logger.info("creating new actor and new identifier for #{params[:uid]}")
      
      else
        actor = Actor.find(identifier.actor_id)
        raise et("actor.no_actor") if actor.blank?
        Rails.logger.info("Identifier #{params[:uid]} exists so returning the associated actor")
      end
      actor_id = actor._id
    else
      # create Identifier for the actor
      if identifier.blank?
        identifier = Identifier.create!(account_id: params[:account_id], app_id: params[:app_id], actor_id: params[:actor_id], uid: params[:uid])
        Rails.logger.info("Creating Identifier #{params[:uid]} for Anonymous actor")
      else
        actor = Actor.find(params[:actor_id])
        
        if identifier.actor_id != params[:actor_id]
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
  ## set a new identifier(alias) of actor

  # INPUT
  ## {
  ##   account_id: "123436456"       [MANDATORY]
  ##   app_id: "1234444',            [MANDATORY]
  ##   actor_id: "1223343",          [MANDATORY]
  ##   uid: "john.doe@example.com",  [MANDATORY]
  ##   identifier: "+1-9911231234"   [MANDATORY]
  ## }

  # OUTPUT => {:return => true, :error => nil}
  def self.alias(params)
    Rails.logger.info("Enter Actor Alias")

    if params[:account_id].blank? or params[:app_id].blank? or 
          params[:actor_id].blank? or params[:uid].blank? or params[:identifier].blank?
      raise et("actor.invalid_argument_in_alias")
    end

    # check if this user exists already
    uid = Identifier.where(app_id: params[:app_id], uid: params[:uid] ).first
    raise et("actor.no_uid", uid: params[:uid], app_id: params[:app_id]) if uid.blank? 
    raise et("actor.no_actor") if uid.actor_id != params[:actor_id]

    # check if Identifier is already exists with this actor
    a = Identifier.where(app_id: params[:app_id], uid: params[:identifier], actor_id: params[:actor_id]).first
    
    if a.blank?   
      Identifier.create!(account_id: params[:account_id], app_id: params[:app_id], actor_id: params[:actor_id], uid: params[:identifier] )
    end

    {:return => true, :error => nil}
  rescue => e
    Rails.logger.error("**** ERROR **** #{er(e)}")
    {:return => false, :error => e}
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
end
