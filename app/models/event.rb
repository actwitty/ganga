require 'utility'

class Event
  include Mongoid::Document
  include Mongoid::Timestamps

  # Relations
  belongs_to   :actor
  belongs_to   :app
  belongs_to   :account
  #embeds_many  :properties
  
  # Atrributes
  validates_presence_of :account_id, :app_id, :actor_id
  
  field :name,        type: String,      default: ""
  validates_presence_of  :name


  field :meta,        type: Boolean,     default: false
  index({app_id: -1, meta: -1})
  index({actor_id: -1, meta: -1})
  index({account_id: -1, meta: -1})

  field :properties,  type: Array,      default: []
  index({"properties.k" => -1, "properties.v" => -1})

  index({updated_at: -1})
  index({created_at: -1})

  # Callbacks

  # Functions

  # NOTE
  ## set the property of actor explicitly

  # INPUT
  ## {
  ##  :account_id => "343434",[MANDATORY]
  ##  :app_id => "1234444',   [MANDATORY]
  ##  :actor_id => "1223343", [OPTIONAL]  # if not given, anonymous actor is created
  ##  :name =>    "sign_up",  [MANDATORY] # event name is case sensitive
  ##  :meta =>  true or false [OPTIONAL]  # true only for internal events like set actor property
  ##  :properties => {        [MANDATORY]
  ##      :email => "john.doe@example.com",
  ##      :customer => {:address => {:city => "Bangalore"}}}
  ##  :property_type => "profile" or "system" [OPTIONAL] ## it only comes from "set" property in Actor
  ## }

  # OUTPUT => {:return => true, :error => nil}
  def self.add!(params)
    Rails.logger.info("Enter Event Create")
    
    if params[:account_id].blank? or params[:app_id].blank? or params[:name].blank? or params[:properties].blank?
      raise et("event.invalid_argument_in_event") 
    end

    # create anonymous actor if actor is blank
    if params[:actor_id].blank?
      actor = Actor.create!(account_id: params[:account_id], app_id: params[:app_id])
      params[:actor_id] = actor._id 
      Rails.logger.info("creating anonymous actor")
    end

    #get app object
    app = App.find(params[:app_id])

    # Build event 
    ev = new(account_id: params[:account_id], app_id: params[:app_id], actor_id: params[:actor_id], name: params[:name])
   
    # create properties of event
    serialized = Utility.serialize_to(hash: params[:properties], serialize_to: "value")   
    raise et("event.property_not_serialized") if serialized.blank?

    # add it to events object
    serialized.each do |k,v|
      #e.properties << Property.new(k: k, v: v)
      ev.properties << {k: k, v: v}
    end

    ev.meta = true if params[:meta] == true

    # save event object
    ev.save!

    ret = app.update_schema(event: params[:name], properties: params[:properties], property_type: params[:property_type])
     
    raise et("event.create_failed") unless ret[:error].blank?

    {:return => ev, :error => nil}  
  rescue => e
    Rails.logger.error("**** ERROR **** #{er(e)}")
    {:return => nil, :error => e}
  end
end