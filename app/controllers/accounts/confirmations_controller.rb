class Accounts::ConfirmationsController < Devise::ConfirmationsController
# Remove the first skip_before_filter (:require_no_authentication) if you
  # don't want to enable logged accounts to access the confirmation page.
  skip_before_filter :require_no_authentication
  skip_before_filter :authenticate_account!

  # POST /resource/confirmation
  def create
    self.resource = resource_class.send_confirmation_instructions(resource_params)
    if successfully_sent?(resource)
      respond_with({}, :location => after_resending_confirmation_instructions_path_for(resource_name))
    else
      respond_with(resource)
    end
  end
  
  # PUT /resource/confirmation
  def update
  	@confirmable = Account.find_or_initialize_with_error_by(:confirmation_token, params[:confirmation_token])
    if @confirmable.password_unset?
      @confirmable.attempt_set_password(params[:account])
      if @confirmable.valid?
        @confirmable.confirm!
      	set_flash_message :notice, :confirmed
      	sign_in_and_redirect(resource_name, @confirmable)
      else
      	self.resource = @confirmable
        @confirmation_token = params[:confirmation_token]
      	@requires_password = true
      	flash[:alert] = []
	   	processed = {}	  
     	resource.errors.full_messages.map {|msg| 
      										flash[:alert] <<  msg if !processed[msg]
      										processed[msg] = true     										
      									}      
        clean_up_passwords resource
        render 'accounts/confirmations/show'
         
       end
    else
    	self.class.add_error_on(self, :email, :password_allready_set)
    end  
  end

  # GET /resource/confirmation?confirmation_token=abcdef
  def show
  	@confirmable = Account.find_or_initialize_with_error_by(:confirmation_token, params[:confirmation_token])
  	self.resource = @confirmable
    

    if @confirmable.password_unset?
      @confirmation_token = params[:confirmation_token]
      @requires_password = true
      render 'accounts/confirmations/show'
    else
      @confirmable.confirm!
      set_flash_message :notice, :confirmed
      sign_in_and_redirect(resource_name, @confirmable)
    end  

  end
  
  protected

  

  
  # The path used after resending confirmation instructions.
  def after_resending_confirmation_instructions_path_for(resource_name)
    new_session_path(resource_name)
  end

  # The path used after confirmation.
  def after_confirmation_path_for(resource_name, resource)
    after_sign_in_path_for(resource)
  end


  
end
