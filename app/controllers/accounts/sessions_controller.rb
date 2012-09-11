class Accounts::SessionsController < Devise::SessionsController
  def create
    Rails.logger.debug("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ abc")
  #  Rails.logger.debug("DBG:#{__method__}:Enter:URL#{request.env['PATH_INFO']} params:#{params}")
  #  Rails.logger.debug("==================================================== def")
  #  build_resource
   # Rails.logger.debug("-------------------------------------------#{resource.inspect})
   # super
  end
end
