class AccessOrigin
  include Mongoid::Document
  include Mongoid::Timestamps
  
  # Relations
  embedded_in :app

  # Attributes
  field  :origin_base,    type: String,   default: "" # cross origin's base for whitelisting. 
                                                             # For example for http://www.abc.co.uk/2342343 
                                                             # origin_base = "abc.co.uk" 
end
