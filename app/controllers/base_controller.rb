class BaseController < ApplicationController
  ####################################################################
  # In your controllers
  protect_from_forgery 
  before_filter :authenticate_user!, :except => [:index]

  ####################################################################
  def index
    Rails.logger.debug("#{__method__}: Enter: URL#{request.env['PATH_INFO']} params:#{params}")
 	if current_account
 		@account = current_account 		
 		Rails.logger.debug("#{__method__}: User logged in as :#{@account}")
 	end
 	Rails.logger.debug("#{__method__}: Exit: URL#{request.env['PATH_INFO']} params:#{params}")   
  end
  ####################################################################
end


