class AccountsController < ApplicationController


  before_filter :authenticate_account!, :except => [:credentials]
  protect_from_forgery
  
  # API to send the credentials to check if the user is logged in
  def credentials
    Rails.logger.debug("Enter: params:#{params}")
    if current_account

      @account = current_account
      Rails.logger.debug("User logged in as :#{@account.inspect}")
      # Tell EmberJS if the account has been activated or not
      # At no point we want to take chance with Ember getting further
      unless @account.active_for_authentication?
        @account[:inactive] = true
      else
        @account[:inactive] = false
      end
      response_json = @account
      Rails.logger.info("Response :#{response_json}")

      if request.xhr?
        response_json[:logged_in] = true
        render :json => response_json, :status => 200
      end

    else
      response_json = {}
      Rails.logger.info("Response :#{response_json}")
      if request.xhr?
        response_json[:logged_in] = false
        render :json => response_json, :status => 200
      end
    end
  end

  # INPUT
  ## {  
  ##    :events => true or false         [OPTIONAL] # events 
  ## }

  # OUTPUT =>{ 
  ##            account: {id: "445654654645", name: "Sudhanshu & Sons Chaddhi Wale", description: {subscription: "Free", authenticate_app: false}},
  ##            events: [
  ##                      {
  ##                        app: {id: "343433433"}
  ##                        actor: {id: "3433434", description:  { profile: {  "name": ["John Doe"],   "email": ["john@doe.com"] }, system: {os: ["win", "mac"]}} }
  ##          
  ##                        name: "sign_in", 
  ##                        properties: [{"k" => "name", "v" => "alok"}, {"k" => "address[city]", "v" => "Bangalore"}]
  ##                        time: 2009-02-19 00:00:00 UTC
  ##                      },
  ##                      {..}
  ##                    ]
  ##        }
  def read
    Rails.logger.info("Enter Account read")

    params[:account_id] = current_account._id if Rails.env != "test"
    ret = Account.read(params)

    raise ret[:error] if !ret[:error].blank?
  
    render json: ret[:return], status: 200      
  rescue => e
    Rails.logger.error("**** ERROR **** #{er(e)}")
    render json: { errors: e.message}, status: 422
  end


  def list_apps
  end

end
