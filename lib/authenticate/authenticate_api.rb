require 'generate_token'

module Authenticate
  class Api
    # this is called from the controller automatically when we use before_filter
    def before( controller )
      Rails.logger.info("Authenticate Api before filter called")
      controller.authenticate_api! unless controller.current_account or controller.authenticated?
    end
  end

  # authenticates api access - implements token expiry
  # INPUT -
  def authenticate_api!
    Rails.logger.info("Enter Authenticate Api")
   
    # just to test we are using HTTP_HOST in test mode as HTTP_ORIGIN cant be set
    Rails.env == "test" ? origin = request.env['HTTP_HOST'] : origin = request.env['HTTP_ORIGIN']

    if !params["token"].blank? and origin.blank?        # API Access

      account_id = AccountsCache.access_token(params["token"])

      raise et("application.unauthorized") if account_id.blank?
      
      # set account_id in params
      if params[:controller] == "accounts" and current_account
        params[:id] = current_account._id.to_s if params[:id].blank?
      else
        params[:account_id] = current_account._id.to_s if params[:account_id].blank?
      end

      # set the request type
      params[:request_type] = AppConstants.request_type_api

      # mark already authenticated
      set_authenticated

      # make api request synchronous as of now
      make_sync_request
    end
  rescue => e 
    Rails.logger.error("**** ERROR **** #{er(e)}")
    head :unauthorized
  end 
end