class AccountsController < ApplicationController


  before_filter :authenticate_account!, :except => [:credentials]
  protect_from_forgery
  
  # API to send the credentials to check if the user is logged in
  def credentials
    Rails.logger.debug("Enter: URL#{request.env['PATH_INFO']} params:#{params}")
    if current_account

      @account = current_account
      Rails.logger.debug("User logged in as :#{@account.inspect}")
      # Tell EmberJS if the account has been activated or not
      # At no point we want to take chance with Ember getting further
      unless @account.active_for_authentication?
        @account[:inactive] = true
      else
        @account[:inactive] = false
      end
      response_json = @account
      Rails.logger.info("Response :#{response_json}")

      if request.xhr?
        response_json[:logged_in] = true
        render :json => response_json, :status => 200
      end

    else
      response_json = {}
      Rails.logger.info("Response :#{response_json}")
      if request.xhr?
        response_json[:logged_in] = false
        render :json => response_json, :status => 200
      end
    end
  end
end
