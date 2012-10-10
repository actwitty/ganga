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
  ## }
  field       :schema,      type:    Hash,      :default => { properties: {}, events: {}}

  ## {
  ##     "name" => "my app",
  ##     "domain" => "http://myapp.com"
  ## }
  field       :description, type:    Hash,      :default => {}
  validates_presence_of :description

  index({account_id: 1, _id: 1})
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
    
    app = App.find(params[:app_id])
    raise et("app.invalid_app_id") if app.blank?

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
  ##                           } 
  ##                 }  
  ##
  ##            events: [
  ##                      {
  ##                        actor: { id: "3433434", description: {"name":  "John Doe","email": "john@doe.com"}
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
    hash[:app] = {id: app._id, description: app.description}

    if params[:events] == true
      events = Event.includes(:actor).where( app_id: params[:app_id], meta: false ).all
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
    end
    save!

    {:return => true, :error => nil}
  rescue => e
    Rails.logger.error("**** ERROR **** #{e.message}")
    {:return => false, :error => e}
  end
end