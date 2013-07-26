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
  validates_presence_of :account_id, :app_id

  validates_presence_of  :name

 
  index({app_id: -1})
  index({account_id: -1})
  index({actor_id: -1})

  field :properties,  type: Array,      default: []
  index({"properties.k" => 1, "properties.v" => 1})

  # Callbacks

  # Functions

  # NOTE
  ## create an event

  # INPUT
  ## {
  ##  :account_id => "343434",[MANDATORY]
  ##  :app_id => "1234444',   [MANDATORY]
  ##  :actor_id => "1223343", [OPTIONAL]  # if not given, anonymous actor is created
  ##  :name =>    "sign_up",  [MANDATORY] # event name is case sensitive
  ##  :properties => {        [MANDATORY]
  ##      :email => "john.doe@example.com",
  ##      :customer => {:address => {:city => "Bangalore"}},
  ##      :$l => "bangalore",
  ##      :$c => "india" 
  ##   }
  ## }

  # OUTPUT => {:return => true, :error => nil}
  def self.add!(params)
    Rails.logger.info("Enter Event Add #{params.inspect}")
    
    if params["account_id"].blank? or params["app_id"].blank? or params["name"].blank? or params["properties"].blank?
      raise et("event.invalid_argument_in_add_event") 
    end

    #get app object
    app = AppsCache.object(params["app_id"] )

    if app.blank? or (app.account_id.to_s != params["account_id"])
      raise et("event.invalid_app_id") 
    end   

    raise et("event.invalid_event_schema") if app.verify_schema(params).blank?
    
    # Build event 
    ev = new(account_id: params["account_id"], app_id: params["app_id"], actor_id: params["actor_id"], name: params["name"])
   
    # create properties of event
    serialized = Utility.serialize_to(hash: params["properties"], serialize_to: "value")   
    raise et("event.property_not_serialized") if serialized.blank?

    # add it to events object
    serialized.each do |k,v|
      #e.properties << Property.new(k: k, v: v)
      ev.properties << {k: k, v: v}
    end

    # save event object
    ev.save!

    {:return => ev, :error => nil}  
  rescue => e
    Rails.logger.error("**** ERROR **** #{er(e)}")
    {:return => nil, :error => e}
  end

  # NOTE
  ## Read events

  # INPUT
  ## {
  ##  :account_id => "343434",[MANDATORY]
  ##  :app_id => "1234444',   [MANDATORY]
  ##  :filter => {            [MANDATORY]
  ##      :app => true  
  ##            OR
  ##      :account => true
  ##            OR
  ##      :actor => true
  ##      :actor_id => "21211313" [MANDATORY when actor: true]
  ##   }
  ## }

  # OUTPUT =>  [
  ##             {
  ##               name: "sign_in", 
  ##               properties: [{"k" => "name", "v" => "alok"}, {"k" => "address[city]", "v" => "Bangalore"}]
  ##               app_id: "343433433",
  ##               actor_id: "3434334",
  ##               account_id: "4446456456",
  ##               time: 2009-02-19 00:00:00 UTC
  ##             },
  ##             {..}
  ##          ],
  def self.read(params)
    Rails.logger.info("Enter Event Read")

    return et("event.invalid_argument_in_read") if params["account_id"].blank? or params["app_id"].blank? or params["filters"].blank?

    array = []
    if params["filters"]["app"]
      events = Event.where( app_id: params["app_id"] ).limit(AppConstants.limit_events).desc(:_id)
      events.each {|attr| array << attr.format_event }
      Rails.logger.info("Adding App Events")

    elsif params["filters"]["account"]
      events = Event.where( account_id: params["account_id"]).limit(AppConstants.limit_events).desc(:_id)
      events.each { |attr| array <<  attr.format_event }
      Rails.logger.info("Adding Account Events")

    elsif params["filters"]["actor"]
      events = Event.where(actor_id: params["filters"]["actor_id"]).limit(AppConstants.limit_events).desc(:_id)
      events.each {|attr| array << attr.format_event}
      Rails.logger.info("Adding Actors Events")   
    end

    {:return => array, :error => nil}  
  rescue => e
    Rails.logger.error("**** ERROR **** #{er(e)}")
    {:return => [], :error => e}
  end

  #NOTE - formats an event object to be sent
  def format_event
    {account_id: self.account_id.to_s, app_id: self.app_id.to_s, actor_id: self.actor_id.to_s, name: self.name, properties: self.properties, time: self.updated_at}
  rescue => e
    Rails.logger.error("**** ERROR **** #{e.message}")
    {}
  end
end