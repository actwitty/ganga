require 'authenticate/authenticate_acc'
require 'authenticate/authenticate_api'
require 'authenticate/authenticate_origin'

module Authenticate

  # will e called in context of controller
  def make_sync_request
    params[:sync] = true
  end

  # builds a session temporarily for cross-origin access or api access
  # INPUT - object "app" or "account"
  def build_session(object)
    Rails.logger.info("Enter  Session")

    if object.class.to_s ==  "App"
      object=Account.find(object.account_id)
    end
    
    raise et("application.account_invalid") if object.blank? # This error should not happen

    sign_in(object)
    self.instance_variable_set(:@tear_down, current_account )

    true
  rescue => e 
    Rails.logger.error("**** ERROR **** #{er(e)}")
    false
  end

  # deletes temporary session made for cross-origin access or api access
  # INPUT - 
  def delete_session
    Rails.logger.info("Enter Delete Session")
    if !self.instance_variable_get(:@tear_down).blank?
      Rails.logger.info("deleting session")
      sign_out(current_account) 
      self.instance_variable_set(:@tear_down, nil )
    end
  end
end