require 'url'
require 'utility'

class App
  include Mongoid::Document
  include Mongoid::Timestamps
  
  # Relations
  belongs_to  :account

  has_many    :actors,  :dependent => :destroy
  has_many    :events
  has_many    :identifiers
  has_many    :conversions
  has_many    :errs,    :dependent => :destroy # errs can exist only app scope, independent of actor

  embeds_many :rules
  embeds_one  :access_origin

  # Attributes
 
  ##  {
  ##                             
  ##    events: {
  ##              'sign_up' => {"name" => String, "address[city]" => "String", "$l" => "String"}
  ##            }
  ## }
  field       :schema,      type:    Hash,    :default => {  events: {}}

  ## {
  ##     "name" => "my app",
  ##     "origin" => "http://myapp.com"
  ## }
  field       :description, type:    Hash,      :default => {}
  
  ## {
  ##     'sign_up' => {"name" => "john", "address" => { "city" => "NY"}, "email" => "john@doe.com", $l" => "String"}
  ##     'purchased' => {"itme" => "ipod", "value" => 50 $" , "$l" => "Bangalore", "$b" => "chrome"}
  ## }
  field       :sample_events, type:  Hash,      :default => {}

  # VALIDATIONS
  validates_presence_of :description

  # Callbacks
  after_create :create_origin

  # INDEX
  index({"description.name" => 1, :account_id =>  1 })
  index({"rules.event" => 1})
  index({"access_origin.origin_base" => 1})

  # Function
  
  # NOTE
  ## Create App

  # INPUT
  ## {  
  ##    :account_id => "2334534534"           [MANDATORY] 
  ##    :description => {                     [MANDATORY]
  ##      :name => "App Name 1"               [MANDATORY] # must be unique in account
  ##      :origin => "http://www.trigmatic.com" [OPTIONAL]  # can be used from API
  ##      :email => "john.doe@example.com",
  ##      :address => {:city => "Bangalore"}
  ##    }
  ## }

  # OUTPUT => {
  ##             :return => obj, :error => nil
  ##          }
  def self.add!(params)
    Rails.logger.info("Enter App Add")

    if params["account_id"].blank? or params["description"].blank? or params["description"]["name"].blank?
      raise et("app.invalid_argument_in_create") 
    end
    
    app = App.where( "description.name" => params["description"]["name"], account_id: params["account_id"]).first
    raise et("app.app_name_already_exist") if !app.blank?
    
    obj = App.create!(account_id: params["account_id"], description: params["description"])

    raise et("app.create_failed") if obj.blank?

    {:return => obj, :error => nil}  
  rescue => e
    Rails.logger.error("**** ERROR **** #{er(e)}")
    {:return => nil, :error => e} 
  end
  
  # NOTE
  ## update app description

  # INPUT
  ## {
  ##  :account_id => "23232312"[MANDATORY] 
  ##  :id => "1234444',        [MANDATORY]
  ##  :description => {        [MANDATORY]
  ##      "email" => "john.doe@example.com",
  ##      "address" => {:city => "Bangalore"}}
  ## }

  # OUTPUT => {:return => object, :error => nil}
  def self.update(params)
    Rails.logger.info("Enter Update App Description")

    if params["id"].blank? or params["account_id"].blank? or params["description"].blank?
      raise et("app.invalid_argument_in_update") 
    end
    
    app = AppsCache.object(params["id"] )

    if app.blank? or (app.account_id.to_s != params["account_id"])
      raise et("app.invalid_app_id", id: params["id"]) 
    end

    desc = Utility.serialize_to(hash: params["description"], serialize_to: "value")

    desc.each do |k,v|

      # update origin in AccessInfo if origin is updated
      if (k == "origin") 
        origin_base = Url.base(v)
        raise et("app.invalid_origin", url: v) if origin_base.blank?
        app.access_origin.update_attribute(:origin_base, origin_base)
      end
      
      app.description[k] = v
    end

    app.save!
    {:return => app, :error => nil}  
  rescue => e
    Rails.logger.error("**** ERROR **** #{er(e)}")
    {:return => false, :error => e} 
  end

  # NOTE
  ## Read App

  # INPUT
  ## {  
  ##    id: 123                       [MANDATORY]
  ##    account_id: 23232323          [MANDATORY]
  ##    events: true or false         [OPTIONAL] # events 
  ##    conversions: true or false    [OPTIONAL] # conversion
  ##    errors: true or false         [OPTIONAL] # errors
  ##    actors: true or false         [OPTIONAL] # actors
  ## }

  # OUTPUT => {:return => object, :error => nil}
  def self.read(params)
    Rails.logger.info("Enter App Read #{params.inspect}")
  
    if params["account_id"].blank? or params["id"].blank?
      raise et("app.invalid_argument_in_read")
    end
    
    app = AppsCache.object(params["id"] )

    if app.blank? or (app.account_id.to_s != params["account_id"])
      raise et("app.invalid_app_id", id: params["id"]) 
    end
     
    {:return => app, :error => nil}  
  rescue => e
    Rails.logger.error("**** ERROR **** #{er(e)}")
    {:return => {}, :error => e}  
  end

 
  # NOTE
  ## Add a sample event

  # INPUT
  ## {
  ##  :account_id => "343434",[MANDATORY]
  ##  :id => "1234444',       [MANDATORY]
  ##  :name =>    "sign_up",  [MANDATORY] # event name is case sensitive
  ##  :properties => {        [MANDATORY]
  ##      :email => "john.doe@example.com",
  ##      :customer => {:address => {:city => "Bangalore"}},
  ##      :$l => "bangalore",
  ##      :$c => "india" 
  ##   }
  ## }

  # OUTPUT => {:return => true, :error => nil}
  def self.add_sample_event(params)
    Rails.logger.info("Enter Add Sample Event")

    if params["account_id"].blank? or params["id"].blank? or params["name"].blank? or params["properties"].blank?
      raise et("app.invalid_argument_in_add_sample_event") 
    end

    #get app object
    app = AppsCache.object(params["id"] )

    if app.blank? or (app.account_id.to_s != params["account_id"])
      raise et("app.invalid_app_id", id: params["id"]) 
    end

    app.sample_events[params["name"]] = params["properties"]

    # Now update the schema of event
    skima = Utility.serialize_to(hash: params["properties"], serialize_to: "type")
    schema["events"][params["name"]] = skima

    app.save!

    {:return => true, :error => nil} 
  rescue => e 
    Rails.logger.error("**** ERROR **** #{e.message}")
    {:return => false, :error => e}  
  end


  # NOTE
  ## Delete a sample event

  # INPUT
  ## {
  ##  :account_id => "343434",[MANDATORY]
  ##  :id =>   "1234444',     [MANDATORY]
  ##  :name => "sign_up",     [MANDATORY] # event name is case sensitive
  ## }

  # OUTPUT => {:return => true, :error => nil}
  def self.delete_sample_event(params)
    Rails.logger.info("Enter Add Sample Event")

    if params["account_id"].blank? or params["id"].blank? or params["name"].blank?
      raise et("app.invalid_argument_in_delete_sample_event") 
    end

    #get app object
    app = AppsCache.object(params["id"] )

    if app.blank? or (app.account_id.to_s != params["account_id"])
      raise et("app.invalid_app_id", id: params["id"]) 
    end

    app.sample_events.delete([params["name"]])

    # Now delete the schema of event
    schema["events"].delete([params["name"]])

    app.save!

    {:return => true, :error => nil} 
  rescue => e 
    Rails.logger.error("**** ERROR **** #{e.message}")
    {:return => false, :error => e} 
  end


  # NOTE
  ## verify schema of an event in app 

  # INPUT
  ## {
  ##   :name => "sign_up", 
  ##   :properties => {  
  ##                    "customer" =>{ "email" => "abc@def.com", 
  ##                                   "address" => {"city" => { "name" =>  "Bangalore"}}
  ##                                 }
  ##                    $l => "bangalore", "$b" => "chrome"
  ##                  }
  ## }

  # OUTPUT => true or false
  def verify_schema(params)
    Rails.logger.info("Enter Verify App")

    events = self.schema["events"]
    return et("app.invalid_event_name", name: params[:name]) if events.blank? or events[params[:name]].blank?
    
    skima = Utility.serialize_to(hash: params[:properties], serialize_to: "type")

    evt = events[params[:name]]

    skima.each do |k,v|
      raise et("app.event_schema_not_matching", name: params[:name])if evt[k] != v
    end

    true
  rescue => e 
    Rails.logger.error("**** ERROR **** #{e.message}")
    false
  end

  
  #NOTE - formats an app object to be sent
  def format_app  
    array = []
    self.rules.each {|rule| array << rule.format_rule} 

    {  
      id: self._id.to_s, account_id: self.account_id.to_s, description: self.description, schema: self.schema,
      sample_events:  self.sample_events, rules: array, time: self.updated_at
    }
  rescue => e
    Rails.logger.error("**** ERROR **** #{e.message}")
    {}
  end

  #INPUT - After create callback for creating origin access
  ##       If fails, transaction rollbacks..and create faileds
  def create_origin
    Rails.logger.info("Enter Create Origin")
    
    return true if self.description["origin"].blank?
    # verify valid domain
    
    origin_base = Url.base(self.description["origin"])
    raise et("app.invalid_origin", url: self.description["origin"]) if origin_base.blank? 
          
    # create token
    access_origin = self.create_access_origin( origin_base: origin_base)
    raise et("app.create_origin_failed") if access_origin.blank?

    true
  rescue => e 
    Rails.logger.error("**** ERROR **** #{e.message}")
    false
  end
end