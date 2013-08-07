require 'generate_token'

class Account
  include Mongoid::Document
  include Mongoid::Timestamps


  # Relations
  has_many    :apps, :dependent => :destroy
  has_many    :actors
  has_many    :events
  has_many    :identifiers
  has_many    :conversions
  has_many    :errs,    :dependent => :destroy # errs can exist only in account scope, independent of actor and app
  embeds_one  :access_token

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

  field :password_unset, :type => Integer, :default => 1 

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

  ## Account Description
  field :description,   type:    Hash,      :default => {
                                                          subscription: AppConstants.subscriptions.free.name,
                                                          authenticate_app: true,
                                                        }

  field :name,         type:  String,   default: "" 
  validates_presence_of  :name

  # Setup accessible (or protected) attributes for your model
  attr_accessible :name, :email, :password, :password_confirmation, :remember_me, :confirmed_at, :password_unset
  
  after_create :create_token 
  # after_create :add_user_to_mailchimp, :unless => Proc.new {|obj| Rails.env == "test"}
  # before_destroy :remove_user_from_mailchimp 


  # INDEX
  index({"access_token.token" => 1})
  def confirmation_required?
    false
  end
  # Functions

  # INPUT
  ## {  
  ##    id: "1212121212"              [MANDATORY]
  ##    events: true or false         [OPTIONAL] # events 
  ##    conversions: true or false    [OPTIONAL] # conversion
  ##    errors: true or false         [OPTIONAL] # errors
  ##    actors: true or false         [OPTIONAL] # actors
  ## }

  # OUTPUT =>{ 
  ##            id: "445654654645", name: "Sudhanshu & Sons Chaddhi Wale", description: {subscription: "Free", authenticate_app: false}
  ##         }
  def self.read(params)

    Rails.logger.info("Enter Account Read")

    if params["id"].blank? 
      raise et("account.invalid_argument_in_read")
    end

    account = Account.find(params["id"])

    raise et("account.invalid_account_id", id: params["id"]) if account.blank?

    hash = {id: account._id.to_s, description: account.description}
   
    {:return => hash, :error => nil}  
  rescue => e
    Rails.logger.error("**** ERROR **** #{er(e)}")
    {:return => {}, :error => e}  
  end

  # new function to set the password
  def attempt_set_password(params)
    p = {}
    p[:password] = params[:password]
    p[:password_confirmation] = params[:password_confirmation]
    p[:password_unset] = 0  
    update_attributes(p)
  end  
  
  # new function to provide access to protected method pending_any_confirmation
  def only_if_unconfirmed
    pending_any_confirmation {yield}
  end

  # Mailchimp integration, add to subscribed list ASA email id is added
  def add_user_to_mailchimp    
    Rails.logger.info("Mailchimp subscribe request being made")
    unless self.email.include?('@example.com')
      mailchimp = Hominid::API.new(AppConstants.mailchimp_key)      
      list_id = mailchimp.find_list_id_by_name AppConstants.mailchimp_list      
      info = { }
      result = mailchimp.list_subscribe(list_id, self.email, info, 'html', false, true, false, true)
      Rails.logger.info("Mailchimp subscribed for the email id #{self.email} to #{AppConstants.mailchimp_list}")
    end
  end


  # Mailchimp integration, remove from subscribed list ASA email id is removed
  def remove_user_from_mailchimp
    unless self.email.include?('@example.com')
      mailchimp = Hominid::API.new(AppConstants.mailchimp_key)
      list_id = mailchimp.find_list_id_by_name AppConstants.mailchimp_list
      result = mailchimp.list_unsubscribe(list_id, self.email, true, false, true)  
      Rails.logger.info("Mailchimp unsubscribed for email id #{self.email}")
    end
  end
  
  # INPUT - After create callback for creating token access
  def create_token
    Rails.logger.info("Enter Create Token")
    
    # create token
    token = GenerateToken.unique_token
    access_token = self.create_access_token( token: token, role: {})
    raise et("account.create_token_failed") if access_token.blank?

    true
  rescue => e 
    Rails.logger.error("**** ERROR **** #{e.message}")
  end  
end
