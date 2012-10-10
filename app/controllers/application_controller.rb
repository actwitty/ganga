class ApplicationController < ActionController::Base
  protect_from_forgery

  before_filter :set_locale

  def set_locale
  	I18n.locale = params[:locale] || I18n.default_locale
  end
  

  def after_sign_in_path_for(resource_or_scope)
    root_path
  end

  # NOTE - If app authentication enabled then do app sign in also 
  ##       otherwise account sign in is enough
  def authenticate_app! 	
    puts current_account.inspect
  	if !current_account[:description][:authenticate_app].blank?
  		Rails.logger.info("App authentication enabled")
  		# sign in into app or redirect to login page
  	end
  end

 #def after_inactive_sign_up_path_for(resource_or_scope)
 #	waiting_path
 #end
 #def after_sign_out_path_for(resource_or_scope)
 # 	root_path
 #end
  
end
