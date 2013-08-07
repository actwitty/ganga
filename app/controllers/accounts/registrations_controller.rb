class Accounts::RegistrationsController < Devise::RegistrationsController
  
  def sign_up_params(params)
    params.require(:account).permit(:email, :password, :password_confirmation, :name)
  end
  
  def after_sign_up_path_for(resource)
    root_path
  end

  def after_inactive_sign_up_path_for(resource)
    root_path
  end
# POST /resource
  def invite_account_request

    build_resource(sign_up_params)
    email = resource.email
    status = 'false'   
    response_json = {}
    #Set default password and a default username
    resource.password = Random.rand(100000...999999) 
    resource.password_confirmation = resource.password 
    o =  [('a'..'z'),('A'..'Z')].map{|i| i.to_a}.flatten  
    resource.name  =  (0...10).map{ o[rand(o.length)] }.join
    resource.password_unset = 0
    Rails.logger.debug("Inviting the user #{resource.inspect}")
    if resource.save!
      status = 'true'            
      response_json[:processed] = status
      response_json[:error_str] = []
      Rails.logger.debug('Invite success')
      render :json => response_json, :status => 200
    else
      processed = {}  
      response_json[:error_str] = []

      resource.errors.full_messages.map {|msg| 
                          response_json[:error_str]  <<  msg if !processed[msg]
                          processed[msg] = false                                                
                        }      
      Rails.logger.error("Invite failed without a rescue Resource => #{resource.inspect}")

      render :json => response_json, :status => 200
    end    
 
  rescue => e 
    Rails.logger.error("Invite failed in rescue #{e.message}  Resource => #{resource.inspect}")
    response_json[:processed] = status
    processed = {}  
    response_json[:error_str] = []

    resource.errors.full_messages.map {|msg| 
                          response_json[:error_str]  <<  msg if !processed[msg]
                          processed[msg] = false                                                }      
    render :json => response_json, :status => 200    
  end

# POST /resource
def create
    build_resource(params['account'])

    if resource.save      
      sign_in(resource_name, resource)
      respond_with resource, :location => after_sign_up_path_for(resource)      
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


