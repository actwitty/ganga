class Identifier
  include Mongoid::Document
  include Mongoid::Timestamps

  # Relations
  belongs_to :actor
  belongs_to :app
  belongs_to :account, index: true

  # Attributes
  validates_presence_of  :account_id, :app_id, :actor_id

  field :uid ,      type: String,    default: ""
  validates_presence_of :uid
  validates_uniqueness_of :uid,  scope:  :app_id
  index({app_id: 1, uid: 1}, {unique: true})
  index({uid: 1, actor_id: 1}, {unique: true})
  
  index({actor_id: 1, app_id: 1})

  field :type ,     type: String,    default: ""
  index(type: 1)

  def format_identifier
    {id: self._id.to_s, account_id: self.account_id.to_s, app_id: self.app_id.to_s, uid: self.uid, time: self.updated_at}
  rescue => e
    Rails.logger.error("**** ERROR **** #{e.message}")
    {}
  end
end
