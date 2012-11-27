require 'generate_token'

module Authenticate
  class Api
    # this is called from the controller automatically when we use before_filter
    def before( controller )
       Rails.logger.info("before filter called")
       controller.authenticate_api!
    end

    def after( controller )
      Rails.logger.info("after filter called")
      controller.delete_session
    end
  end

  # authenticates api access - implements token expiry
  # INPUT -
  def authenticate_api!
    Rails.logger.info("Enter Authenticate Api")

    if !current_account.blank?
      Rails.logger.info("Authenticated Account")
      return true
    end
    
    # just to test we are using HTTP_HOST in test mode as HTTP_ORIGIN cant be set
    Rails.env == "test" ? origin = request.env['HTTP_HOST'] : origin = request.env['HTTP_ORIGIN']

    if !params["token"].blank? and origin.blank?        # API Access
      obj = verify_token!(params)
     
      raise et("application.unauthorized") if obj.blank?
      
      raise et("application.unauthorized") if build_session(obj) == false
    end
  rescue => e 
    Rails.logger.error("**** ERROR **** #{er(e)}")
    head :unauthorized
  end

  # validates access token and refresh it if needed
  def verify_token!(params)
    Rails.logger.info("Enter Verify Token")

    token = params["token"]

    if token[0] == AppConstants.account_token_prefix
      obj = Account.where("access_info.token" => token).first
      
    elsif token[0] == AppConstants.app_token_prefix
      obj = App.where("access_info.token" => token).first

      # if app id is not matching with requests app id return unauthorised 
      if !params[:id].blank? and (params[:id] != obj._id.to_s)
        raise et("application.unauthorized")
      end
    else
      raise et("application.invalid_token")
    end
    
    if !obj.blank?
      access = obj.access_info
      # refresh access token if needed
      if access.expires_at <= Time.now.utc 
        raise et("application.refresh_token_failed") if access.refresh_token == false
      end
    else
      raise et("application.invalid_token")
    end
    obj
  rescue => e 
    Rails.logger.error("**** ERROR **** #{er(e)}")
    nil
  end
end