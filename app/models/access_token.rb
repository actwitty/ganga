class AccessToken
  include Mongoid::Document
  include Mongoid::Timestamps
  
  # Relations
  embedded_in :account

  # Attributes
  field  :token,          type: String,   default: "" # api token
  field  :expires_at,     type: Time,     default: AppConstants.token_expiry_days.days.from_now
  field  :role,           type: Hash,     default: {} # will be used for oauth

  # Validation
  validates_presence_of :token

  # Index

  # Functions

  # Refresh Token at the expiry.. Also updates App or Account based on Scope with token
  def refresh_token
    Rails.logger.info("Enter Refresh Token")

    self.token = GenerateToken.unique_token
    self.expires_at = AppConstants.token_expiry_days.days.from_now
    
    self.save!
    true
  rescue => e 
    Rails.logger.error("**** ERROR **** #{er(e)}")
    false
  end
end
