class Account
  include Mongoid::Document
  include Mongoid::Timestamps

  # Relations
  has_many :apps, :dependent => :destroy

  # Attributes
  ## Include default devise modules. Others available are:
  ## :token_authenticatable,
  ## :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
    :recoverable, :rememberable, :trackable, :validatable,
    :lockable, :confirmable

  ## Database authenticatable
  field :email,              :type => String, :default => ""
  field :encrypted_password, :type => String, :default => ""

  validates_presence_of :email
  validates_presence_of :encrypted_password

  ## Recoverable
  field :reset_password_token,   :type => String
  field :reset_password_sent_at, :type => Time

  ## Rememberable
  field :remember_created_at, :type => Time

  ## Trackable
  field :sign_in_count,      :type => Integer, :default => 0
  field :current_sign_in_at, :type => Time
  field :last_sign_in_at,    :type => Time
  field :current_sign_in_ip, :type => String
  field :last_sign_in_ip,    :type => String

  ## Confirmable
  field :confirmation_token,   :type => String
  field :confirmed_at,         :type => Time
  field :confirmation_sent_at, :type => Time
  field :unconfirmed_email,    :type => String # Only if using reconfirmable

  ## Lockable
  field :failed_attempts, :type => Integer, :default => 0 # Only if lock strategy is :failed_attempts
  field :unlock_token,    :type => String # Only if unlock strategy is :email or :both
  field :locked_at,       :type => Time

  ## Token authenticatable
  ### field :authentication_token, :type => String

  ## Other attributes for Profile
  ### Identity
  field :name,              :type => String, :default => ""

  validates_presence_of :name

  field :photo,             :type => String

  ### Address
  field :address,           :type => String
  field :city,              :type => String
  field :country,           :type => String
  field :region,            :type => String
  field :pin_code,          :type => String

  ### Contact
  field :office,            :type => String
  field :mobile,            :type => String
 
end
