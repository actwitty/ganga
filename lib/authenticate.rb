require 'authenticate/authenticate_acc'
require 'authenticate/authenticate_api'
require 'authenticate/authenticate_origin'

module Authenticate
  # builds a session temporarily for cross-origin access or api access
  # INPUT - access_info object
  def build_session(access)
    Rails.logger.info("Enter  Session")
    account=Account.find(access.account_id)
    raise et("application.account_invalid") if account.blank? # This error should not happen

    sign_in(account)
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