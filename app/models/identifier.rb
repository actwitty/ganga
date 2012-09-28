class Identifier
  include Mongoid::Document
  include Mongoid::Timestamps

  # Relations
  belongs_to :actor
  belongs_to :app

  # Attributes
  validates_presence_of  :app_id, :actor_id

  field :uid ,      type: String,    default: ""
  validates_presence_of :uid
  validates_uniqueness_of :uid,  scope:  :app_id
  index({app_id: 1, uid: 1}, {unique: true})

  index({uid: 1, actor_id: 1}, {unique: true})
  index(actor_id: 1)
end
