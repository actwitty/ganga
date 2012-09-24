class Actor
  include Mongoid::Document
  include Mongoid::Timestamps

  # Relations
  belongs_to   :app

  has_many     :events,      :dependent => :destroy

  ## Actor can have properties independent of event as well.. 
  ## so explicit destroy is needed
  has_many     :properties, :dependent => :destroy
  

  # Attributes
  ## For anonymous actor we may have to generate user name
  field   :name,    :type => String, 	:default => ""
  validates_presence_of  :name

  ## Unique uid of the actor. can be email or any othe guid
  field   :uid,		:type => String, 	:default => ""
  validates_presence_of  :uid

  ## TODO => This contains hot properties value 
  field   :property_cache,     :type => Hash,  :default => {}

  # Function
  
end
