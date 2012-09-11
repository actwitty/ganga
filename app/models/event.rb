class Event
  include Mongoid::Document

  embedded_in 	  :actor

  field   :name,    :type => String,  :default => ""
  validates_presence_of  :name
  
  field   :property,    :type => Hash,  :default => ""
  validates_presence_of  :property
end
