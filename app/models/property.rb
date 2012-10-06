class Property
  include Mongoid::Document

  # Relations
  embedded_in :event
end
