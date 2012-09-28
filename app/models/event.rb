class Event
  
  include Mongoid::Document
  include Mongoid::Timestamps

  # Example
  ## {  name: "sign_in", 
  ##    properties: { 
  ##                  name: "Roger Federer", 
  ##                  address: { 
  ##                              country: "Switzerland"
  ##                           }
  ##                }
  ## }

  # Relations

  belongs_to 	:actor
  belongs_to  :app

  has_many    :properties, :dependent => :destroy

  # Attributes
  validates_presence_of  :actor_id, :app_id, :account_id

  field   :name,    :type => String,  :default => ""
  validates_presence_of  :name  

  # field  :app_id,     type:   String
  # validates_presence_of  :app_id
end
