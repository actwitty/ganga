require 'utility'
class ActorsController < ApplicationController
  protect_from_forgery
  
  authenticate_request( origin: { only: ["create","read","identify","set"] } )

  respond_to :json

  # NOTE
  ## Creates an actor.. 
  
  # INPUT => 
  ## {
  ##  :app_id => "1234444',   [MANDATORY]
  ##  :properties =>          [OPTIONAL] ## if present, then either system or profile property must be there
  ##     {        
  ##        profile: {
  ##          :email => "john.doe@example.com",
  ##          :customer => {:address => {:city => "Bangalore"}}}
  ##        }
  ##        system: {
  ##          :browser => "chrome"
  ##        }
  ##     }
  ## }

  # OUTPUT => {
  ##             "id"=>"50742b0063fe85d42a000005",
  ##             "account_id"=>"50742aff63fe85d42a000001", 
  ##             "app_id"=>"50742b0063fe85d42a000003",
  ##             "time"=> "2009-02-19 00:00:00 UTC",
  ##             "description"=>{"customer[address][city]"=>"Bangalore", "email"=>"john.doe@example.com"}, 
  ##          }
  ##[async call]
  ##          {status: true}
  def create
    Rails.logger.info("Enter Create Actor")

    ret = {:return => {status: true}, :error => nil}

    if params[:sync]
      ret = ActorsWorker.create(params)
    else
      ActorsWorker.perform_async(params)
    end  
    
    raise ret[:error] if !ret[:error].blank?

    respond_with( ret[:return], status: 200, location: "nil")
  rescue => e 
    Rails.logger.error("**** ERROR **** #{er(e)}")
    respond_with({ errors:  e.message}, status: 422, :location => "nil")
  end
  
  # NOTE
  ## Delete Actor

  # INPUT
  ## {  
  ##    :id => 123                [MANDATORY]
  ## }

  # OUTPUT => 
  ##[sync call]
  ##          {status; true or false}
  ##[async call]
  ##          {status: true}
  def delete
    Rails.logger.info("Enter App Delete")
    
    if params[:id].blank?
      raise et("actor.invalid_argument_in_delete") 
    end

    ret = {:return => {status: true}, :error => nil}

    if params[:sync]
      ret = ActorsWorker.delete(params)
    else
      ActorsWorker.perform_async(params)
    end  
    
    raise ret[:error] if !ret[:error].blank?

    respond_with( ret[:return], status: 200, location: "nil")
  rescue => e 
    Rails.logger.error("**** ERROR **** #{er(e)}")
    respond_with({ errors:  e.message}, status: 422, :location => "nil")
  end


  # NOTE
  ## Uniqly identify an actor..
  ## If not set an auto unique id is assigned to actor
  ## Also If not set, then a user coming from mobile and PC
  ## will be identified as two different user.
  ## Identify with Any unique id which business want - email or any other id

  # INPUT => 
  ## {
  ##   id:  "23232323",               [OPTIONAL]  ## if not give anonymous actor is created and
  ##                                            ## if uid is not already existing in app_id then
  ##                                            ## the uid is assigned to anonymous actor otherwise  
  ##                                            ## actor_id of assigned actor is return
  ##   app_id:    "1234444',          [MANDATORY]
  ##   uid:  "john.doe@example.com"   [MANDATORY]
  ##   type:  "mobile"                [OPTIONAL]
  ## }


  # OUTPUT => 
  ##[sync call]
  ##          {:id => 1232323}
  ##[async call]
  ##          {status: true}
  def identify
    Rails.logger.info("Enter Actor Identify")

    ret = {:return => {status: true}, :error => nil}

    if params[:sync]
      ret = ActorsWorker.identify(params)
    else
      ActorsWorker.perform_async(params)
    end  
    
    raise ret[:error] if !ret[:error].blank?

    respond_with( ret[:return], status: 200, location: "nil")
  rescue => e 
    Rails.logger.error("**** ERROR **** #{er(e)}")
    respond_with({ errors:  e.message}, status: 422, :location => "nil")
  end

  # NOTE
  ## set the property of actor explicitly
  ## It sets both System property of Actor and Profile Properties of actor
  ## System Property - describes browser, location, OS etc auto extracted by trigmatic script
  ## Profile Property - describes property of actor which a business want to set like "gender", "dob" etc

  # INPUT
  ## {
  ##  :id => "1223343",       [MANDATORY] 
  ##  :app_id => "1234444',   [MANDATORY]
  ##  :properties =>          [MANDATORY] ## either system or profile property must be there
  ##     {        
  ##        profile: {
  ##          :email => "john.doe@example.com",
  ##          :customer => {:address => {:city => "Bangalore"}}}
  ##        }
  ##        system: {
  ##          :browser => "chrome"
  ##        }
  ##     }
  ## }

  # OUTPUT =>
  ##[sync call] 
  ##         {
  ##             "id"=>"50742b0063fe85d42a000005",
  ##             "account_id"=>"50742aff63fe85d42a000001", 
  ##             "app_id"=>"50742b0063fe85d42a000003",
  ##             "created_at"=>"2012-10-09T13:47:44Z", "updated_at"=>"2012-10-09T13:47:44Z",
  ##             "description"=>{"customer[address][city]"=>"Bangalore", "email"=>"john.doe@example.com"}, 
  ##          }
  ##[async call]
  ##          {status: true}


  def set
    Rails.logger.info("Enter Actor Set")

    ret = {:return => {status: true}, :error => nil}

    if params[:sync]
      ret = ActorsWorker.set(params)
    else
      ActorsWorker.perform_async(params)
    end  
    
    raise ret[:error] if !ret[:error].blank?

    respond_with( ret[:return], status: 200, location: "nil")
  rescue => e 
    Rails.logger.error("**** ERROR **** #{er(e)}")
    respond_with({ errors:  e.message}, status: 422, :location => "nil")
  end

  # NOTE
  ## set a new identifier(alias) of actor

  # INPUT
  ## {
  ##   app_id: "1234444',            [MANDATORY]
  ##   uid: "john.doe@example.com",  [MANDATORY]
  ##   new_uid: "+1-9911231234"   [MANDATORY]
  ## }

  # OUTPUT => 
  ##[sync call]
  ##          {:status => true}
  ##[async call]
  ##          {status: true}
  def alias
    Rails.logger.info("Enter Actor Alias")

    ret = {:return => {status: true}, :error => nil}

    if params[:sync]
      ret = ActorsWorker.alias(params)
    else
      ActorsWorker.perform_async(params)
    end  
    
    raise ret[:error] if !ret[:error].blank?

    respond_with( ret[:return], status: 200, location: "nil")
  rescue => e 
    Rails.logger.error("**** ERROR **** #{er(e)}")
    respond_with({ errors:  e.message}, status: 422, :location => "nil")
  end

  # NOTE
  ## Read Actor Data

  # INPUT
  ## {
  ##   id: "3433434",                [OPTIONAL] 
  ##           OR
  ##   uid: "john.doe@example.com",  [OPTIONAL] 
  ##
  ##   app_id: "1234444',            [MANDATORY]
  ##
  ##   identifiers: true or false    [OPTIONAL] # associated identifiers 
  ##   events: true or false         [OPTIONAL] # events 
  ##   conversions: true or false    [OPTIONAL] # conversion
  ##   errors: true or false         [OPTIONAL] # errors
  ## }

  # OUTPUT => 
  ##[sync call]
  ##          {
  ##            id: "3433434", app_id: "434343", account_id: "44464646",
  ##            description:  { profile: {  "name": ["John Doe"],   "email": ["john@doe.com"] }, system: {os: ["win", "mac"]}},
  ##            time: 2009-02-19 00:00:00 UTC }
  ##          }
  ##[async call]
  ##          {status: true}
  def read
    Rails.logger.info("Enter Actor Read")

    ret = {:return => {status: true}, :error => nil}
    
    if params[:sync]
      ret = ActorsWorker.read(params)
    else
      ActorsWorker.perform_async(params)
    end  
    
    raise ret[:error] if !ret[:error].blank?

    respond_with( ret[:return], status: 200)
  rescue => e 
    Rails.logger.error("**** ERROR **** #{er(e)}")
    respond_with({ errors:  e.message}, status: 422)
  end
end