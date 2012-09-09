class Accounts::RegistrationsController < Devise::RegistrationsController
  def create
    Rails.logger.debug("#{__method__}: Enter: URL#{request.env['PATH_INFO']} params:#{params}")
    super
   
  end
end
