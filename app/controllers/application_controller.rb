require 'pp'
class ApplicationController < ActionController::Base
  #protect_from_forgery

  respond_to :json, :html

  #before_filter :set_locale
  #before_filter :set_access_control_headers

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
  
   
  def  set_access_control_headers
    list = {"https://twitter.com" => true, "http://stackoverflow.com" => true, "http://api.jquery.com" => true, "http://keen.io" => true}
        
    if !list[request.env['HTTP_ORIGIN']].blank?
      headers['Access-Control-Allow-Origin'] = request.env['HTTP_ORIGIN']
      headers['Access-Control-Request-Method'] = "*"
      headers['Access-Control-Allow-Headers'] = "*"
      headers['Access-Control-Allow-Credentials'] = "true"
    end   
    # respond_with({ errors: "Un-Authorised"} , status: 200)
  end
end
