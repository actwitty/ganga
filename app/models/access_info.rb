require 'generate_token'

class AccessInfo
  include Mongoid::Document
  include Mongoid::Timestamps
  
  # Relations

  # Attributes
  field  :origin,     type: String,   default: ""
  
  field  :scope,      type: String,   default: ""

  field  :token,      type: String,   default: ""
  field  :expires_at, type: Time,  default: AppConstants.token_expiry_days.days.from_now
  field  :role,       type: Hash,     default: {}

  field  :app_id,     type: String
  field  :account_id, type: String

  # Validation
  validates_presence_of :account_id, :scope, :token

  # Index
  index({account_id: 1})
  index({account_id: 1, app_id: 1})
  index({app_id: 1})
  index({origin: 1})
  index({token: 1, scope: 1})
  index({scope: 1})
  index({expires_at: 1})

  # Functions

  # NOTE
  ## Create App

  # INPUT
  ## {  
  ##    :account_id => "2334534534"     [MANDATORY] 
  ##    :app_id => "42423423423"        [OPTIONAL]
  ##    :origin => "http://www.xyz.com" [OPTIONAL]
  ##    :scope => "app" or "account"    [MANDATORY]
  ##    :role => {}                     [OPTIONAL] #Not supported as of now
  ## }

  # OUTPUT => {:return => object, :error => e} 
  def self.add!(params)
    Rails.logger.info("Enter Access Info Add")

    if params[:account_id].blank? or params[:scope].blank?
      raise et("access_info.invalid_argument_in_create") 
    end

    #check if app object is valid
    if !params[:app_id].blank?
      app = App.where(account_id: params[:account_id], _id: params[:app_id] ).first
      raise et("access_info.invalid_app_id") if app.blank?
      params[:scope] = "app"
    end
    
    token = GenerateToken.unique_token

    obj = AccessInfo.create!(account_id: params[:account_id], app_id: params[:app_id], token: token, 
                            origin: params[:origin], scope: params[:scope], role: params[:role])

    raise et("access_info.create_failed") if obj.blank?
    {:return => obj, :error => nil} 
  rescue => e 
    Rails.logger.error("**** ERROR **** #{er(e)}")
    {:return => nil, :error => e} 
  end

  def refresh_token
    Rails.logger.info("Enter Refresh Token")

    self.token = GenerateToken.unique_token
    self.expires_at = AppConstants.token_expiry_days.days.from_now

    if self.scope == "app" and !self.app_id.blank?
      app = App.find(self.app_id)
      raise et("access_info.invalid_app_id") if app.blank?
      app.description[AppConstants.token] = self.token
      app.save!
   
    elsif self.scope == "account" and self.app_id.blank?
      app = Account.find(self.account_id)
      raise et("access_info.invalid_account_id") if account.blank?
      account.description[AppConstants.token] = self.token
      account.save!
    else
      # something went wrong
      raise et("access_info.invalid_scope")
    end

    self.save!
    true
  rescue => e 
    Rails.logger.error("**** ERROR **** #{er(e)}")
    false
  end
end
