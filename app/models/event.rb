require 'utility'

class Event
  include Mongoid::Document
  include Mongoid::Timestamps

  # Relations
  belongs_to   :actor
  belongs_to   :app
  belongs_to   :account, 		index: true
  # embeds_many  :properties
  
  # Atrributes
  validates_presence_of :account_id, :app_id, :actor_id
  
  field :name,      type: String,      default: ""
  validates_presence_of  :name
  index(app_id: -1, actor_id: -1, name: -1)
  index(actor_id: -1, name: -1)
  index(name: -1)

  field :properties, type: Array, default: []
  index('properties.key' => 1, 'properties.value' => 1)

  # Callbacks

  # Functions

  # NOTE
  ## set the property of actor explicitly

  # INPUT
  ## {
  ##  :account_id => "343434",[MANDATORY]
  ##  :app_id => "1234444',   [MANDATORY]
  ##  :actor_id => "1223343", [OPTIONAL]  #if not given, anonymous actor is created
  ##  :name =>    "sign_up", [MANDATORY] # event name is case sensitive
  ##  :properties => {        [MANDATORY]
  ##      :email => "john.doe@example.com",
  ##      :customer => {:address => {:city => "Bangalore"}}}
  ## }

  # OUTPUT => {:return => true, :error => nil}
  def self.add!(params)
    Rails.logger.info("Enter Set Property of Actor")
    
    if params[:account_id].blank? and params[:app_id].blank? or params[:name].blank? or params[:properties].blank?
      raise et("event.invalid_argument_in_event") 
    end

    # create anonymous actor if actor is blank
    if params[:actor_id].blank?
      Actor.create!(account_id: params[:account_id], app_id: params[:app_id])
      Rails.logger.info("creating anonymous actor")
    end

    #get app object
    app = App.find(params[:app_id])

    # Build event 
    e = new(account_id: params[:account_id], app_id: params[:app_id], actor_id: params[:actor_id], name: params[:name])
   
    # create properties of event
    serialized = Utility.serialize_to(hash: params[:properties], serialize_to: "value")   
    raise et("event.property_not_serialized") if serialized.blank?

    # add it to events object
    serialized.each do |k,v|
      #e.properties << Property.new(k: k, v: v)
      e.properties << {k: k, v: v}
    end
    # save event object
    e.save!

    puts e.inspect
    puts e.properties.inspect
    
    ret = app.update_schema(event: params[:name], properties: params[:properties])
     
    raise et("event.create_failed") unless ret[:error].blank?

    {:return => true, :error => nil}  
  rescue => e
    Rails.logger.error("**** ERROR **** #{er(e)}")
    {:return => false, :error => e}
  end
end