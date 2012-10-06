require 'utility'

class App
  include Mongoid::Document
  include Mongoid::Timestamps
  
  # Relations
  belongs_to  :account, index: true

  has_many    :actors,  :dependent => :destroy
  has_many    :events

  embeds_many :rules

  # Attributes
 
  ## { 
  ##      properties: {
  ##        'customer[email]' => { 
  ##                                "String" => {"set_actor" => true, "sign_up" => true} }
  ##                                "Fixnum" => {"set_actor" => true, "sign_in" => true} }
  ##      }
  ##      events: {
  ##        sign_up => {"name" => String, "address[city]" => "String"}
  ##      }
  ## }
  field       :schema,      type:    Hash,      :default => { properties: {}, events: {}}

  ## {
  ##     "address[city]" => "bangalore",
  ##     "address[country][state]" => "Karnataka"
  ## }
  field       :description, type:    Hash,      :default => {}
  validates_presence_of :description


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

  # OUTPUT => {:return => true, :error => nil}
  def self.update(params)
    Rails.logger.info("Enter Update App Description")

    if params[:app_id].blank? or params[:account_id].blank? or params[:description].blank?
      raise et("app.invalid_argument_in_update") 
    end
    
    app = App.where(params[:app_id])
    raise et("app.invalid_app_id") if app.blank?

    desc = Utility.serialize_to(hash: params[:description], serialize_to: "type")
    
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
      schema["properties"][k][v] = {} if schema["properties"][k][v].blank?
      schema["properties"][k][v][params[:event]] = true
      event[k] = v
    end
    save!

    puts schema.inspect

    {:return => true, :error => nil}
  rescue => e
    Rails.logger.error("**** ERROR **** #{e.message}")
    {:return => false, :error => e}
  end
end