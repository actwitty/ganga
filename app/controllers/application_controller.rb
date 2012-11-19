require 'authenticate'

class ApplicationController < ActionController::Base
  protect_from_forgery
  #respond_to :json, :html

  def after_sign_in_path_for(resource_or_scope)
    root_path
  end
  
  def build_session(access) 
    account = Account.find(access.account_id)
    raise et("application.account_invalid") if account.blank? # This error should not happen

    sign_in(account)
    self.instance_variable_set(:@tear_down, current_account )

    true
  rescue => e 
    Rails.logger.error("**** ERROR **** #{er(e)}")
    false
  end

  def delete_session
    Rails.logger.info("Enter Delete Session")
    if !self.instance_variable_get(:@tear_down).blank?
      Rails.logger.info("deleting session")
      sign_out(current_account) 
      self.instance_variable_set(:@tear_down, nil )
    end
  end

  def authenticate_origin!
    Rails.logger.info("Enter Authenticate Origin")
    
    if !current_account.blank?
      Rails.logger.info("Authenticated Account")
      return true
    end

    # just to test we are using HTTP_HOST in test mode as HTTP_ORIGIN cant be set
    Rails.env == "test" ? origin = request.env['HTTP_HOST'] : origin = request.headers['HTTP_ORIGIN']

    if !origin.blank?
      access = AccessInfo.where(origin: origin).first

      if !access.blank?
        headers['Access-Control-Allow-Origin'] = origin
        headers["Access-Control-Allow-Methods"] = %w{GET POST}.join(",")
        headers["Access-Control-Allow-Headers"] = %w{Origin Accept Content-Type X-Requested-With X-CSRF-Token}.join(",")
        headers['Access-Control-Max-Age'] = '86400'
        headers['Access-Control-Expose-Headers'] = 'ETag'
        headers['Access-Control-Allow-Credentials'] = "true"
      else
        raise et("application.unauthorized")
      end

      # Some browsers send an options request to the server first, 
      # to make sure the correct access headers are set.
      # We need to catch this in Rails, returning a 200 status with the correct headers.
      if request.request_method == "OPTIONS"
        # halt the callback chain and return ok
        head :ok
      else
        # continue with callback chain
        raise et("application.unauthorized") if build_session(access) == false
      end
    end
  rescue => e 
    Rails.logger.error("**** ERROR **** #{er(e)}")
    head :unauthorized
  end

  def authenticate_api!
    Rails.logger.info("Enter Authenticate #{request.inspect} Api")

    if !current_account.blank?
      Rails.logger.info("Authenticated Account")
      return true
    end
    
    # just to test we are using HTTP_HOST in test mode as HTTP_ORIGIN cant be set
    Rails.env == "test" ? origin = request.env['HTTP_HOST'] : origin = request.headers['HTTP_ORIGIN']

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

  def self.authenticate_request(params, options = [])
    Rails.logger.info("Enter Authenticate Request")
    
    before_filter AuthenticateOrigin.new, params[:origin]
    before_filter AuthenticateApi.new
    before_filter AuthenticateAccount.new

    after_filter  AuthenticateApi.new
  rescue => e 
    Rails.logger.error("**** ERROR **** #{er(e)}")
    #head :unauthorized
  end
end
