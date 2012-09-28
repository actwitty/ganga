class Alias
  include Mongoid::Document
  include Mongoid::Timestamps

  # Relations
  belongs_to :actor

  # Attributes
  field :app_id,    type: String,   default: ""
  validates_presence_of  :app_id 

  field :uid ,      type: String,    default: ""
  validates_presence_of :uid
  validates_uniqueness_of :uid,  scope:  :app_id
  index({app_id: 1, uid: 1, actor_id: 1}, {unique: true})

end