class BaseController < ApplicationController
  ####################################################################
  # In your controllers
  protect_from_forgery
  respond_to  :html
  before_filter :authenticate_account!, :except => [:index]

  ####################################################################
  def index
    Rails.logger.debug("#{__method__}: Enter: URL#{request.env['PATH_INFO']} params:#{params}")
 	if current_account
 		@account = current_account
    @internalPage = true
 		Rails.logger.debug("#{__method__}: User logged in as :#{@account}")
  else
    @internalPage = false
 	end
 	Rails.logger.debug("#{__method__}: Exit: URL#{request.env['PATH_INFO']} params:#{params}")   
  end
  ####################################################################
end


