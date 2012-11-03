require 'utility'

class App
  include Mongoid::Document
  include Mongoid::Timestamps
  
  # Relations
  belongs_to  :account

  has_many    :actors,  :dependent => :destroy
  has_many    :events

  embeds_many :rules

  # Attributes
 
  ## { 
  ##      properties: {
  ##        'customer[email]' => { 
  ##                                "String" => ["set_actor", "sign_up"] ,
  ##                                "Fixnum" => ["purchased", "sign_in"] 
  ##                             }
  ##      }
  ##      events: {
  ##        'sign_up' => {"name" => String, "address[city]" => "String"}
  ##      }
  ##
  ##      actor:  {
  ##                 "gender" => String, "name" => "String"
  ##              }  
  ##
  ##      system: {
  ##                 "location" => String, "page_view_time" => "String"
  ##              }  
  ## }
  field       :schema,      type:    Hash,      :default => { properties: {}, events: {}, profile: {}, system: {}}

  ## {
  ##     "name" => "my app",
  ##     "domain" => "http://myapp.com"
  ## }
  field       :description, type:    Hash,      :default => {}
  validates_presence_of :description

  index({account_id: 1, _id: 1})
  index({"rules.event" => 1})
  # Function
  
  # NOTE
  ## update app description

  # INPUT
  ## {
  ##  :account_id => "23232312"[MANDATORY] 
  ##  :app_id => "1234444',    [MANDATORY]
  ##  :description => {        [MANDATORY]
  ##      :email => "john.doe@example.com",
  ##      :address => {:city => "Bangalore"}}
  ## }

  # OUTPUT => {:return => object, :error => nil}
  def self.update(params)
    Rails.logger.info("Enter Update App Description")

    if params[:app_id].blank? or params[:account_id].blank? or params[:description].blank?
      raise et("app.invalid_argument_in_update") 
    end
    
    app = App.where(account_id: params[:account_id], _id: params[:app_id] ).first

    raise et("app.invalid_app_id", id: params[:app_id]) if app.blank?

    desc = Utility.serialize_to(hash: params[:description], serialize_to: "value")
    
    desc.each do |k,v|
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
  ##    :account_id => "1212121212"      [MANDATORY]
  ##    :app_id => 123                   [MANDATORY]
  ##    :events => true or false         [OPTIONAL] # events 
  ## }

  # OUTPUT =>{ 
  ##            account: {id: "445654654645"},
  ##
  ##            app: {
  ##                   id: "4545554654645", 
  ##                   description: {"name": "my app", "domain": "http://myapp.com"}, 
  ##                   rules: [
  ##                             {
  ##                               "name"=>"A fancy rule", "event"=>"singup", "owner"=>"client", "action"=>"topbar",
  ##                               "action_param"=>{"text"=>"A quickbrown fox jumps over a lazy dog", "href"=>"http://www.google.com", "color"=>"#333333", "width"=>"50"}, 
  ##                               "conditions"=>[{"property"=>"person[email]", "negation"=>"true", "operation"=>"ew", "value1"=>"@gmail.com", "connect"=>"and"}], 
  ##                               "updated_at"=>2012-10-24 07:43:38 UTC, 
  ##                               "created_at"=>2012-10-24 07:43:38 UTC, "id"=>"50879c2a63fe855d14000005"
  ##                             },
  ##                             {..}
  ##                           ],
  ##                   schema: {
  ##                             properties: {
  ##                                           'customer[email]' => { 
  ##                                                                   "String" => ["set_actor", "sign_up"],
  ##                                                                   "Fixnum" => ["purchased", "sign_in"]
  ##                                         }
  ##                           
  ##                             events: {
  ##                                           'sign_up' => {"name" => String, "address[city]" => "String"}
  ##                                     }
  ##                             
  ##                             profile:{
  ##                                         "gender" => String, "name" => "String"
  ##                                     }  
  ##                             system: {
  ##                                         "location" => String, "page_view_time" => "String"
  ##                                     }  
  ##                           } 
  ##                 }  
  ##
  ##            events: [
  ##                      {
  ##                        actor: {id: "3433434", description:  { profile: {  "name": ["John Doe"],   "email": ["john@doe.com"] }, system: {os: ["win", "mac"]}} }
  ##          
  ##                        name: "sign_in", 
  ##                        properties: [{"k" => "name", "v" => "alok"}, {"k" => "address[city]", "v" => "Bangalore"}]
  ##                        time: 2009-02-19 00:00:00 UTC
  ##                      },
  ##                      {..}
  ##                    ]
  ##        }
  def self.read(params)
    Rails.logger.info("Enter App Read")
    hash = {events: []}

    if params[:account_id].blank? or params[:app_id].blank?
      raise et("app.invalid_argument_in_read")
    end
    app = App.where(account_id: params[:account_id], _id: params[:app_id] ).first

    raise et("app.invalid_app_id", id: params[:app_id]) if app.blank?

    hash[:account] = {id: app.account_id}
    hash[:app] = {id: app._id, description: app.description, rules: app.format_rules}
    
    
    if params[:events] == true
      events = Event.includes(:actor).where( app_id: params[:app_id], meta: false ).limit(AppConstants.limit_events).desc(:_id)
      events.each do |attr|
        hash[:events] << { 
                            actor: {id: attr.actor_id, description: attr.actor.description}, 
                            name: attr.name, properties: attr.properties, time: attr.created_at
                         }
      end
    end
  
    {:return => hash, :error => nil}  
  rescue => e
    Rails.logger.error("**** ERROR **** #{er(e)}")
    {:return => {}, :error => e}  
  end

  # NOTE
  ## set the property of actor explicitly

  # INPUT
  ## {
  ##   :event => "sign_up", 
  ##   :properties => {  
  ##                    "customer" =>{ "email" => "abc@def.com", 
  ##                                   "address" => {"city" => { "name" =>  "Bangalore"}}
  ##                                 }
  ##                  }
  ##   :property_type => nil or "system" or "actor" ## COMMENT => nil = normal events, "actor" = "actor properties", 
  ##                                                                          "system" = "system properties of actor"
  ## }

  # OUTPUT => {:return => true, :error => nil}
  def update_schema(params)
    Rails.logger.info("Enter Update Schema")

    skima = Utility.serialize_to(hash: params[:properties], serialize_to: "type")

    schema["events"][params[:event]] = {} if schema["events"][params[:event]].blank?

    event = schema["events"][params[:event]]

    skima.each do |k,v|
      schema["properties"][k] = {} if schema["properties"][k].blank?
      schema["properties"][k][v] = [] if schema["properties"][k][v].blank?
      schema["properties"][k][v] << params[:event]
      
      event[k] = v

      schema[params[:property_type].to_s][k] = v if !params[:property_type].blank?
    end

    save!

    {:return => true, :error => nil}
  rescue => e
    Rails.logger.error("**** ERROR **** #{e.message}")
    {:return => false, :error => e}
  end

  def format_rules
    Rails.logger.info("Enter Format Rules")

    array = []
    
    # serialize rules
    self.rules.each do |rule|
      rule = rule.attributes
      rule["id"] = rule["_id"]
      rule.delete("_id")
      array << rule 
    end

    array
  rescue => e
    Rails.logger.error("**** ERROR **** #{e.message}")
    []
  end
end