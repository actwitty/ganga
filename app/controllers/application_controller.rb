require 'pp'
class ApplicationController < ActionController::Base
  protect_from_forgery
  #respond_to :json, :html

  #before_filter :set_access_control_headers

  def after_sign_in_path_for(resource_or_scope)
    root_path
  end

  # NOTE - If app authentication enabled then do app sign in also 
  ##       otherwise account sign in is enough
  def authenticate_app! 	
    if !current_account[:description][:authenticate_app].blank?
  		Rails.logger.info("App authentication enabled")
  		# sign in into app or redirect to login page
  	end
  end
  
  def verify_cross_site
    allowed = false
    access  = nil

    if !request.env['HTTP_ORIGIN'].blank?   # JSONP/CORS request from a website 
      access = AccessInfo.where(origin: request.env['HTTP_ORIGIN']).first
      if !access.blank?
        headers['Access-Control-Allow-Origin'] = request.env['HTTP_ORIGIN']
        headers['Access-Control-Request-Method'] = "*"
        headers['Access-Control-Allow-Headers'] = "*"
        headers['Access-Control-Allow-Credentials'] = "true"
        allowed = true
      end
    end

    allowed
  end

  def verify_api
    allowed = false
    access  = nil
    
    if !params["api_key"].blank?
      access = AccessInfo.where(token: params["token"]).first

      if !access.blank?
        # refresh access token if needed
        if access.expires_at <= Time.now.utc 
          if access.refresh_token == false
            raise et("application.refresh_token_failed")
          end
        end
        allowed = true 
      end
    end
    allowed
  end   

  def  apply_access_control
    Rails.logger.info("Enter apply access control")

    #only for un-autheticated request
    if current_account.blank? 

      allowed = false 
      access = nil

       
        allowed = verify_cross_request(request, headers) 
      elsif !params["api_key"].blank?        # API Access
        allowed = verify_api(request, headers)
      end
      
      raise et("application.unauthorized") if allowed.blank? or access.blank?
      
      account = Account.find(access._id)
      raise et("application.account_invalid") if account.blank? # This error should not happen

      sign_in(account)
      self.instance_variable_set(:@tear_down, current_account )
    end  
  rescue => e 
    Rails.logger.error("**** ERROR **** #{er(e)}")
    head :unauthorized
  end

  def tear_access_control
    if !self.instance_variable_get(:@tear_down).blank?
      sign_out(current_account) 
      self.instance_variable_set(:@tear_down, nil )
    end
  end
end
