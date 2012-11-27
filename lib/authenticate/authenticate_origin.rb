module Authenticate
  class Origin
    # this is called from the controller automatically when we use before_filter
    def before( controller )
      Rails.logger.info("before filter called")
      controller.authenticate_origin!
    end
  end

  # authenticates cross origin requests (CORS).. implements whitelisting
  # INPUT -
  def authenticate_origin!
    Rails.logger.info("Enter Authenticate Origin")
   
    if !current_account.blank?
      Rails.logger.info("Authenticated Account")
      return true
    end

    # just to test we are using HTTP_HOST in test mode as HTTP_ORIGIN cant be set
    Rails.env == "test" ? origin = request.env['HTTP_HOST'] : origin = request.env['HTTP_ORIGIN']

    if !origin.blank?
      origin_base = Url.base(origin)
      raise et("application.invalid_origin", url: params[:origin]) if origin_base.blank?

      app = App.where("access_info.origin_base" => origin_base).first
      
      # if app id is not matching with requests app id return unauthorised 
      if !params[:id].blank? and (params[:id] != app._id.to_s)
        raise et("application.unauthorized")
      end

      if !app.blank?
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
        raise et("application.unauthorized") if build_session(app) == false
      end
    end
  rescue => e 
    Rails.logger.error("**** ERROR **** #{er(e)}")
    head :unauthorized
  end  
end