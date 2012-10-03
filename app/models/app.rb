class App
  include Mongoid::Document
  include Mongoid::Timestamps
  
  # Relations
  belongs_to  :account

  has_many    :actors,  :dependent => :destroy
  has_many    :events
  has_many    :properties

  embeds_many :rules

  # Attributes
  field		    :description,    :type => Hash,    :default => {}
  validates_presence_of    :description

  ## { 
  ##      properties: {
  ##        'customer[email]' => { 
  ##                                "String" => {"set_actor" => true, "sign_up" => true} }
  ##                                "Fixnum" => {"set_actor" => true, "sign_in" => true} }
  ##      }
  ## }
  field       :schema, :type => Hash,      :default => { properties: {}, events: {}}

  # Function
  
  # NOTE
  ## set the property of actor explicitly

  # INPUT
  ## {    customer[email] => "String",
  ##      customer[address][city][name] =>  "Bangalore"
  ## }

  # OUTPUT => {:return => true, :error => nil}
  def update_schema(skima)
    Rails.logger.info("Enter Update Schema")
    
    schema["events"][skima["event"]] = {} if schema["events"][skima["event"]].blank?
    event = schema["events"][skima["event"]]

    skima["properties"].each do |k,v|
      schema["properties"][k] = {} if schema["properties"][k].blank?
      schema["properties"][k][v] = {} if schema["properties"][k][v].blank?
      schema["properties"][k][v][skima["event"]] = true
      event[k] = true
    end
    save!

    {:return => true, :error => nil}
  rescue => e
    Rails.logger.error("**** ERROR **** #{e.message}")
    {:return => false, :error => e}
  end

end