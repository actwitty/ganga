class Property
  include Mongoid::Document
  include Mongoid::Timestamps

  # Relations
  belongs_to   :event
  belongs_to   :actor
  belongs_to   :app

  # Atrributes
end
