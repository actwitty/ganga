class Account
  include Mongoid::Document
  include Mongoid::Timestamps


  # Relations
  has_many :apps, :dependent => :destroy
  has_many :actors
  has_many :events
  has_many :identifiers

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
                                                           authenticate_app: true 
                                                        }

  field :name,         type:  String,   default: "" 
  validates_presence_of  :name

  # Setup accessible (or protected) attributes for your model
  attr_accessible :name, :email, :password, :password_confirmation, :remember_me, :confirmed_at, :password_unset
   
  after_create :add_user_to_mailchimp, :unless => Proc.new {|obj| Rails.env == "test"}
  before_create :foo
  before_destroy :remove_user_from_mailchimp 

  # Functions

  # INPUT
  ## {  
  ##    :account_id => "1212121212"      [MANDATORY]
  ##    :events => true or false         [OPTIONAL] # events 
  ## }

  # OUTPUT =>{ 
  ##            account: {id: "445654654645", name: "Sudhanshu & Sons Chaddhi Wale", description: {subscription: "Free", authenticate_app: false}},
  ##            events: [
  ##                      {
  ##                        app: {id: "343433433", description: {"name": "my app", "domain": "http://myapp.com"}, }
  ##                        actor: {id: "3433434", description:  { profile: {  "name": ["John Doe"],   "email": ["john@doe.com"] }, system: {os: ["win", "mac"]}} }          
  ##                        name: "sign_in", 
  ##                        properties: [{"k" => "name", "v" => "alok"}, {"k" => "address[city]", "v" => "Bangalore"}]
  ##                        time: 2009-02-19 00:00:00 UTC
  ##                      },
  ##                      {..}
  ##                    ]
  ##        }
  def self.read(params)

    Rails.logger.info("Enter Account Read")

    hash = {events: []}

    if params[:account_id].blank? 
      raise et("account.invalid_argument_in_read")
    end

    account = Account.find(params[:account_id])

    raise et("account.invalid_account_id", id: params[:account_id]) if account.blank?

    hash[:account] = {id: account._id, description: account.description}

    if params[:events] == true
      events = Event.includes(:actor, :app).where( account_id: params[:account_id], meta: false ).limit(AppConstants.limit_events).desc(:_id)
      events.each do |attr|
        hash[:events] << {
                          app: {id: attr.app_id, description: attr.app.description},
                          actor: {id: attr.actor_id, description: attr.actor.description}, 
                          name: attr.name, properties: attr.properties, time: attr.created_at
                         }
      end
    end

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
  def foo
    Rails.logger.info("Foo is hit #{self.inspect}")
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
  
end
