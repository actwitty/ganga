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
 
  ##  {
  ##     properties: {
  ##                    'customer[email]' => {  
  ##                                           "total"=>5, 
  ##                                           "types" => { 
  ##                                                         "String" => {"total" => 3, "events" => {"set_actor" => 2, "sign_up" => 1}},
  ##                                                         "Number" => {"total" => 2, "events" => {"purchased" => 1, "sign_up" => 1}}
  ##                                                      }
  ##                                         }
  ##                 }
  ##                           
  ##    events:      {
  ##                    'sign_up' => {"name" => String, "address[city]" => "String"}
  ##                 }
  ##                             
  ##    profile:     {
  ##                    "customer[address][city]"=>  {"total"=>2, "types"=>{"String"=>1, "Number" => 1}}, 
  ##                    "email"=>                    {"total"=>1, "types"=>{"String"=>1}}
  ##                 }  
  ##    system:      {
  ##                    "os"=>        {"total"=>2, "types"=>{"String"=>1, "Number"=>1}}, 
  ##                    "browser"=>   {"total"=>2, "types"=>{"String"=>2}}}
  ##                 }  
  ## }
  field       :schema,      type:    Hash,    :default => { properties: {}, events: {}, profile: {}, system: {}}

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
  ## Create App

  # INPUT
  ## {  
  ##    :account_id => "2334534534"   [MANDATORY] 
  ##    :description => {             [MANDATORY]
  ##      :email => "john.doe@example.com",
  ##        :address => {:city => "Bangalore"}}
  ## }

  # OUTPUT => {
  ##             :return => obj, :error => nil
  ##          }
  def self.add!(params)
    Rails.logger.info("Enter App Add")

    if params[:account_id].blank? or params[:description].blank?
      raise et("app.invalid_argument_in_create") 
    end
    
    obj = App.create!(account_id: params[:account_id], description: params[:description])

    # create the super actor of app. it will be meta actor
    actor = Actor.create!(account_id: params[:account_id], app_id: obj._id, meta: true)
    raise et("app.actor_create_failed") if actor.blank?
    obj.description[AppConstants.super_actor] = actor._id 

    ret = AccessInfo.add!(app_id: obj._id, account_id: params[:account_id], origin: params[:description][:domain], scope: "app" )
    raise et("access.access_create_failed") if !ret[:error].blank?
    obj.description[AppConstants.token] = ret[:return].token

    obj.save!
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
  ##  :id => "1234444',    [MANDATORY]
  ##  :description => {        [MANDATORY]
  ##      "email" => "john.doe@example.com",
  ##      "address" => {:city => "Bangalore"}}
  ## }

  # OUTPUT => {:return => object, :error => nil}
  def self.update(params)
    Rails.logger.info("Enter Update App Description")

    if params[:id].blank? or params[:account_id].blank? or params[:description].blank?
      raise et("app.invalid_argument_in_update") 
    end
    
    app = App.where(account_id: params[:account_id], _id: params[:id] ).first

    raise et("app.invalid_app_id", id: params[:id]) if app.blank?

    desc = Utility.serialize_to(hash: params[:description], serialize_to: "value")
    
    puts app.inspect
    desc.each do |k,v|
      app.description[k.to_sym] = v if k != AppConstants.super_actor and k != AppConstants.token
    end

    app.save!
    puts app.inspect
    {:return => app, :error => nil}  
  rescue => e
    Rails.logger.error("**** ERROR **** #{er(e)}")
    {:return => false, :error => e} 
  end

  # NOTE
  ## Read App

  # INPUT
  ## {  
  ##    account_id:  "1212121212"      [MANDATORY]
  ##    id: 123                   [MANDATORY]
  ##    events: true or false         [OPTIONAL] # events 
  ##    conversions: true or false    [OPTIONAL] # conversion
  ##    errors: true or false         [OPTIONAL] # errors
  ##    actors: true or false         [OPTIONAL] # actors
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
  ##                                                                   "total"=>5, 
  ##                                                                   "types" => { 
  ##                                                                                "String" => {"total" => 3, "events" => {"set_actor" => 2, "sign_up" => 1}},
  ##                                                                                "Number" => {"total" => 2, "events" => {"purchased" => 1, "sign_up" => 1}}
  ##                                                                              }
  ##                                                                }
  ##                                         }
  ##                           
  ##                             events:     {
  ##                                           'sign_up' => {"name" => String, "address[city]" => "String"}
  ##                                         }
  ##                             
  ##                             profile:    {
  ##                                           "customer[address][city]"=>  {"total"=>1, "types"=>{"String"=>1}}, 
  ##                                           "email"=>                    {"total"=>1, "types"=>{"String"=>1}}
  ##                                         }  
  ##                             system:     {
  ##                                           "os"=>        {"total"=>2, "types"=>{"String"=>1, "Number"=>1}}, 
  ##                                           "browser"=>   {"total"=>2, "types"=>{"String"=>2}}}
  ##                                         }  
  ##                           } 
  ##
  ##            events: [
  ##                      {
  ##                        id: "3232342434", name: "sign_in", 
  ##                        properties: [{"k" => "name", "v" => "alok"}, {"k" => "address[city]", "v" => "Bangalore"}]
  ##                        actor_id: "3433434",
  ##                        time: 2009-02-19 00:00:00 UTC
  ##                      },
  ##                      {..}
  ##                    ],
  ##            conversions: [
  ##                            {
  ##                              id: "32323424355",
  ##                              properties: [{"k" => "button", "v" => "clicked"}, {"k" => "times", "v" => "40"}]
  ##                              actor_id: "3433434",
  ##                              time: 2009-02-19 23:00:00 UTC
  ##                            },
  ##                            {...}
  ##                         ],
  ##            errors: [
  ##                       {
  ##                          id: "3232342434",
  ##                          properties: [{"k" => "name", "v" => "Javascript Error"}, {"k" => "reason", "v" => "dont know"}]
  ##                          actor_id: "3433434",
  ##                          time: 2009-02-19 21:00:00 UTC
  ##                       },
  ##                       {...}
  ##                    ],
  ##            actors: [
  ##                      {
  ##                        id: "3433434", 
  ##                        description:  { profile: {  "name": ["John Doe"],   "email": ["john@doe.com"] }, system: {os: ["win", "mac"]}},
  ##                        time: 2009-02-19 21:00:00 UTC
  ##                      }
  ##                      {..}
  ##                    ]
  ##        }
  def self.read(params)
    Rails.logger.info("Enter App Read")
    hash = {events: [], actors: [], conversions: [], errors: []}

    if params[:account_id].blank? or params[:id].blank?
      raise et("app.invalid_argument_in_read")
    end
    app = App.where(account_id: params[:account_id], _id: params[:id] ).first

    raise et("app.invalid_app_id", id: params[:id]) if app.blank?

    hash[:account] = {id: app.account_id.to_s}
    
    hash[:app] = app.format_app
    
    if params[:events] == true
      events = Event.where( app_id: params[:id], meta: false ).limit(AppConstants.limit_events).desc(:_id)
      events.each {|attr| hash[:events] << attr.format_event }
      Rails.logger.info("Adding Events")
    end

    if params[:conversions] == true
      conversions = Conversion.where(app_id: app._id).limit(AppConstants.limit_conversions).desc(:_id)
      conversions.each {|attr| hash[:conversions] << attr.format_conversion}
      Rails.logger.info("Adding Conversions")
    end

    if params[:errors] == true
      errors = Err.where(app_id: app._id).limit(AppConstants.limit_errors).desc(:_id)
      errors.each {|attr| hash[:errors] << attr.format_err}
      Rails.logger.info("Adding Errors")
    end

    if params[:actors] == true
      actors = Actor.where(app_id: app._id).limit(AppConstants.limit_actors).desc(:_id)
      actors.each { |attr| hash[:actors] << attr.format_actor  if attr.meta == false }
      Rails.logger.info("Adding Actors")
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

    # set profile or system property_type => profile or system
    type = params[:property_type].to_s

    skima.each do |k,v|
      schema["properties"][k] = { "total" => 0, "types" => {}} if schema["properties"][k].blank?
      property = schema["properties"][k]
      property["total"] += 1

      property["types"][v] =  {"total" => 0, "events" => {}} if property["types"][v].blank?
      property["types"][v]["total"] += 1
      property["types"][v]["events"][params[:event]] = 0 if property["types"][v]["events"][params[:event]].blank?
      property["types"][v]["events"][params[:event]] += 1

      event[k] = v

      # set profile or system property_type => profile or system
      if !params[:property_type].blank?
        schema[type][k] = { "total" => 0, "types" => {}} if schema[type][k].blank?
        schema[type][k]["total"] += 1
        
        schema[type][k]["types"][v] = 0 if schema[type][k]["types"][v].blank?
        schema[type][k]["types"][v] += 1
      end
    end

    save!

    {:return => true, :error => nil}
  rescue => e
    Rails.logger.error("**** ERROR **** #{e.message}")
    {:return => false, :error => e}
  end

  def format_app
    self.description["super_actor_id"] = self.description["super_actor_id"].to_s
    array = []
    self.rules.each {|rule| array << rule.format_rule}

    {id: self._id.to_s, account_id: self.account_id.to_s, description: self.description, schema: self.schema, rules: array, time: self.updated_at}
  rescue => e
    Rails.logger.error("**** ERROR **** #{e.message}")
    {}
  end
end