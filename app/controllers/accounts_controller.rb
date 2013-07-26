class AccountsController < ApplicationController

  protect_from_forgery
  #before_filter :authenticate_account!, :except => [:credentials]
  authenticate_request(account: {:except => [:credentials]})

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
  ##            id: "445654654645", name: "Sudhanshu & Sons Chaddhi Wale", description: {subscription: "Free", authenticate_app: false}
  ##         }
  def read
    Rails.logger.info("Enter Account read")

    ret = {:return => {status: true}, :error => nil}
    
    if params[:sync]
      ret = AccountsWorker.read(params)
    else
      AccountsWorker.perform_async(params)
    end  
    
    raise ret[:error] if !ret[:error].blank?

    respond_with( ret[:return], status: 200)
  rescue => e 
    Rails.logger.error("**** ERROR **** #{er(e)}")
    respond_with({ errors:  e.message}, status: 422)
  end


  #NOTE
  ## List apps 
  
  # INPUT
  ## {  
  ##   
  ## }

  # OUTPUT =>{ 
  ##           apps: [
  ##                   { 
  ##                     id: "343433433", account_id: "324324", 
  ##                     description: {"name": "my app", "origin": "http://myapp.com"},
  ##                     schema: {                      
  ##                               events: {
  ##                                        'sign_up' => {"name" => String, "address[city]" => "String", "$l" => "String"}
  ##                                       }
  ##                             
  ##                             },
  ##                     sample_events: {
  ##                                      'sign_up' => {"name" => "john", "address" => { "city" => "NY"}, "email" => "john@doe.com", $l" => "String"}
  ##                                      'purchased' => {"itme" => "ipod", "value" => 50 $" , "$l" => "Bangalore", "$b" => "chrome"}
  ##                                   },
  ##                     rules: [
  ##                              {
  ##                                "name"=>"A fancy rule", "event"=>"singup", "owner"=>"client", "action"=>"topbar",
  ##                                "action_param"=>{"text"=>"A quickbrown fox jumps over a lazy dog", "href"=>"http://www.google.com", "color"=>"#333333", "width"=>"50"}, 
  ##                                "conditions"=>[{"property"=>"person[email]", "negation"=>"true", "operation"=>"ew", "value1"=>"@gmail.com", "connect"=>"and"}], 
  ##                                "updated_at"=>2012-10-24 07:43:38 UTC, 
  ##                                "created_at"=>2012-10-24 07:43:38 UTC, "id"=>"50879c2a63fe855d14000005"
  ##                              },
  ##                              {..}
  ##                            ],
  ##                     
  ##                     time: 2009-02-19 21:00:00 UTC
  ##                   } , 
  ##                   {...}, 
  ##                   {...}
  ##                 ]
  ##         }
  def list_apps
    Rails.logger.info("Enter Account => List Apps")

    ret = {:return => {status: true}, :error => nil}
    
    if params[:sync]
      ret = AccountsWorker.list_apps(params)
    else
      AccountsWorker.perform_async(params)
    end  
    
    raise ret[:error] if !ret[:error].blank?

    respond_with( ret[:return], status: 200)
  rescue => e 
    Rails.logger.error("**** ERROR **** #{er(e)}")
    respond_with({ errors:  e.message}, status: 422)
  end
end
