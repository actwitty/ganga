class Rule
  include Mongoid::Document
  include Mongoid::Timestamps

  # Trigger => Filters => Actions

  # Relations
  embedded_in :app
  
  # Atrributes

end
