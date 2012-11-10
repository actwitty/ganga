class AccountsController < ApplicationController

  protect_from_forgery
  before_filter :authenticate_account!, :except => [:credentials]

  respond_to  :json
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
        respond_with(response_json, :status => 200)
      end

    else
      response_json = {}
      Rails.logger.info("Response :#{response_json}")
      if request.xhr?
        response_json[:logged_in] = false
        respond_with( response_json, :status => 200)
      end
    end
  end


  # INPUT
  ## {  
  ##    events: true or false         [OPTIONAL] # events 
  ##    conversions: true or false    [OPTIONAL] # conversion
  ##    errors: true or false         [OPTIONAL] # errors
  ##    actors: true or false         [OPTIONAL] # actors
  ## }

  # OUTPUT =>{ 
  ##            account: {id: "445654654645", name: "Sudhanshu & Sons Chaddhi Wale", description: {subscription: "Free", authenticate_app: false}},
  ##            events: [
  ##                      {
  ##                        name: "sign_in", 
  ##                        properties: [{"k" => "name", "v" => "alok"}, {"k" => "address[city]", "v" => "Bangalore"}]
  ##                        app_id: "343433433",
  ##                        actor_id: "3434334"
  ##                        time: 2009-02-19 00:00:00 UTC
  ##                      },
  ##                      {..}
  ##                    ],
  ##            conversions: [
  ##                            {
  ##                              id: "32323424355",
  ##                              properties: [{"k" => "button", "v" => "clicked"}, {"k" => "times", "v" => "40"}],
  ##                              app_id: "343433433",
  ##                              actor_id: "3433434",
  ##                              time: 2009-02-19 23:00:00 UTC
  ##                            },
  ##                            {...}
  ##                         ],
  ##            errors: [
  ##                       {
  ##                          id: "3232342434",
  ##                          properties: [{"k" => "name", "v" => "Javascript Error"}, {"k" => "reason", "v" => "dont know"}]
  ##                          app_id: "343433433",
  ##                          actor_id: "3433434",
  ##                          time: 2009-02-19 21:00:00 UTC
  ##                       },
  ##                       {...}
  ##                    ],
  ##            actors: [
  ##                      {
  ##                        id: "3433434", 
  ##                        description:  { profile: {  "name": ["John Doe"],   "email": ["john@doe.com"] }, system: {os: ["win", "mac"]}},
  ##                        time: 2009-02-19 21:00:00 UTC
  ##                      }
  ##                      {..}
  ##                    ]
  ##        }
  def read
    Rails.logger.info("Enter Account read")

    params[:account_id] = current_account._id if Rails.env != "test"
    ret = Account.read(params)

    raise ret[:error] if !ret[:error].blank?
  
    respond_with(ret[:return], status: 200)     
  rescue => e
    Rails.logger.error("**** ERROR **** #{er(e)}")
    respond_with( { errors: e.message}, status: 422)
  end


  #NOTE
  ## List apps 
  
  # INPUT
  ## {  
  ##   
  ## }

  # OUTPUT =>{ 
  ##            events: [
  ##                      {
  ##                        apps: {app_id: "343433433", account_id: "324324", description: {"name": "my app", "domain": "http://myapp.com"}, }
  ##                      },
  ##                      {..}
  ##                    ]
  ##        }
  def list_apps
    Rails.logger.info("Enter Account => List Apps")

    hash = { apps: []}

    params[:account_id] = current_account._id if Rails.env != "test" 

    array = hash[:apps]

    App.where(account_id: params[:account_id]).all.each do |attr|
      array << {id: attr._id, account_id: current_account._id, description: attr.description, schema: attr.schema}  
    end
  
    Rails.logger.info("#{array.inspect}") 
    respond_with(array, status: 200)      
  rescue => e
    Rails.logger.error("**** ERROR **** #{er(e)}")
    respond_with( { errors: e.message}, status: 422)
  end

end
