module Authenticate
	class Acc
	  # this is called from the controller automatically when we use before_filter
	  def before( controller )
	    Rails.logger.info("Authenticate Account before filter called")
	    return true if controller.authenticated?
      
      controller.authenticate_acc!     
   	end
	end

  def authenticate_acc!
    Rails.logger.info("Enter Authenticate account")
  
    #devise method    
    authenticate_account!

    make_sync_request

    # set account_id in params
    if params[:controller] == "accounts" and current_account
      params[:id] = current_account._id.to_s if params[:id].blank?
    else
      params[:account_id] = current_account._id.to_s if params[:account_id].blank?
    end

    # set the request type
    params[:request_type] = AppConstants.request_type_session
  rescue => e 
    Rails.logger.error("**** ERROR **** #{e.message}")
    false
  end
end