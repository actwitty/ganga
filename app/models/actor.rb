class Actor
  include Mongoid::Document
  include Mongoid::Timestamps

  # Relations
  belongs_to   :app

  has_many     :events,      :dependent => :destroy

  ## Actor can have properties independent of event as well.. 
  ## so explicit destroy is needed
  has_many     :properties,   :dependent => :destroy
  
  has_many     :identifiers,     :dependent => :destroy

  # Attributes

  # Function  
end
