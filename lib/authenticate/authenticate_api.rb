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
      access = AccessInfo.where(token: params["token"]).first

      if !access.blank?
        # refresh access token if needed
        if access.expires_at <= Time.now.utc 
          raise et("application.refresh_token_failed") if access.refresh_token == false
        end
      else
        raise et("application.unauthorized")
      end     
      
      raise et("application.unauthorized") if build_session(access) == false
    end
  rescue => e 
    Rails.logger.error("**** ERROR **** #{er(e)}")
    head :unauthorized
  end
end