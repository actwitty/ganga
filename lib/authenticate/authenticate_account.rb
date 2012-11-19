class AuthenticateAccount
  # this is called from the controller automatically when we use before_filter
  def before( controller )
     Rails.logger.info("before filter called")
     controller.authenticate_account!
  end
end