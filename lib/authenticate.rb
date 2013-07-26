require 'authenticate/authenticate_acc'
require 'authenticate/authenticate_api'
require 'authenticate/authenticate_origin'

module Authenticate

  # will e called in context of controller
  def make_sync_request
    params[:sync] = true
  end

  # NOTE - check if already authenticated
  def authenticated?
    instance_variable_get(:@authenticated)
  end

  # NOTE - 

  # NOTE - set request is authenticated
  def set_authenticated
    instance_variable_set(:@authenticated, true )
  end
 
  # NOTE - verify that app_id is matching with with app id coming in params.
  ##       apps#create and accounts#* requests will not come here as it is 
  ##       coming from clients browser and such requests are not allowed
  def validate_app_from_app_id(app_id)
    Rails.logger.info("Enter Validate App from App Id")
    
    # there should be no request for account in this context (access_origin)
    if params[:controller] == "accounts" 
      return false
    elsif params[:controller] == "apps"
      return params[:id] == app_id
    else
      return params[:app_id] == app_id # this case handles any other controller..
                                       # app_id must be there for anyother request other than account                                        
    end
  rescue => e 
    Rails.logger.error("**** ERROR **** #{e.message}")
    false
  end
end