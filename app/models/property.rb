class Property
  include Mongoid::Document

  # Relations
  # embedded_in :event

  field :k, type: String, default: ""
  field :v, type: String, default: ""
end
