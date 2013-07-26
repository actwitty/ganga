module Authenticate
  class Origin
    # this is called from the controller automatically when we use before_filter
    def before( controller )
      Rails.logger.info("Authenticate Origin before filter called")
      controller.authenticate_origin! unless controller.current_account or controller.authenticated?
    end
  end

  # authenticates cross origin requests (CORS).. implements whitelisting
  # INPUT -
  def authenticate_origin!
    Rails.logger.info("Enter Authenticate Origin")
 
    # just to test we are using HTTP_HOST in test mode as HTTP_ORIGIN cant be set
    Rails.env == "test" ? origin = request.env['HTTP_HOST'] : origin = request.env['HTTP_ORIGIN']

    if !origin.blank?
      origin_base = Url.base(origin)
      raise et("application.invalid_origin", url: params[:origin]) if origin_base.blank?

      app = AppsCache.access_origin(origin_base)

      raise et("application.unauthorized") if app.blank? or validate_app_from_app_id(app[:id]).blank? 
      
      fill_headers(origin)      

      # set account_id in params
      params[:account_id] = app[:account_id] if params[:account_id].blank?
       # set the request type
      params[:request_type] = AppConstants.request_type_origin

      # Some browsers send an options request to the server first, 
      # to make sure the correct access headers are set.
      # We need to catch this in Rails, returning a 200 status with the correct headers.
      if request.request_method == "OPTIONS"
        # halt the callback chain and return ok
        head :ok
      else
        # continue with callback chain
        set_authenticated
      end
    end
  rescue => e 
    Rails.logger.error("**** ERROR **** #{er(e)}")
    head :unauthorized
  end 

  def fill_headers(origin)
    headers['Access-Control-Allow-Origin'] = origin
    headers["Access-Control-Allow-Methods"] = %w{GET POST}.join(",")
    headers["Access-Control-Allow-Headers"] = %w{Origin Accept Content-Type X-Requested-With X-CSRF-Token}.join(",")
    headers['Access-Control-Max-Age'] = '86400'
    headers['Access-Control-Expose-Headers'] = 'ETag'
    headers['Access-Control-Allow-Credentials'] = "true"
  end 
end