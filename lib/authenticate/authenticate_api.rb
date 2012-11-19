class AuthenticateApi
  # this is called from the controller automatically when we use before_filter
  def before( controller )
     Rails.logger.info("before filter called")
     controller.authenticate_api!
  end

  def after( controller )
    Rails.logger.info("after filter called")
    controller.delete_session
  end
end