class Accounts::RegistrationsController < Devise::RegistrationsController

# POST /resource
  def invite_account_request
    build_resource
    email = resource.email
    status = 'false'   
    response_json = {}
    
    #Set default password and a default username
    resource.password = Random.rand(100000...999999) 
    resource.password_confirmation = resource.password 
    o =  [('a'..'z'),('A'..'Z')].map{|i| i.to_a}.flatten  
    resource.name  =  (0...10).map{ o[rand(o.length)] }.join
    resource.password_unset = 0
    if resource.save!
      status = 'true'            
    end
    response_json[:processed] = status
    response_json[:error_str] = []
    render :json => response_json, :status => 200
 
  rescue => e 
    response_json[:processed] = status
    processed = {}  
    response_json[:error_str] = []

    resource.errors.full_messages.map {|msg| 
                          response_json[:error_str]  <<  msg if !processed[msg]
                          processed[msg] = true                                                }      
    render :json => response_json, :status => 200
    
  end

# POST /resource
  def create
    build_resource
    resource.password_unset = 1
    if resource.save
      if resource.active_for_authentication?
        set_flash_message :notice, :signed_up if is_navigational_format?
        sign_in(resource_name, resource)
        respond_with resource, :location => after_sign_up_path_for(resource)
      else
        set_flash_message :notice, :"signed_up_but_#{resource.inactive_message}" if is_navigational_format?
        expire_session_data_after_sign_in!
        respond_with resource, :location => after_inactive_sign_up_path_for(resource)
      end
    else
	   flash[:alert] = []
	   processed = {}	  
     resource.errors.full_messages.map {|msg| 
      										flash[:alert] <<  msg if !processed[msg]
      										processed[msg] = true     										
      									}      
      clean_up_passwords resource
      respond_with resource
    end
  end
end
