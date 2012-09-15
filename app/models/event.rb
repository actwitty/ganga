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
  field   :name,    :type => String,  :default => ""
  validates_presence_of  :name  

  # field  :app_id,     type:   String
  # validates_presence_of  :app_id
end
