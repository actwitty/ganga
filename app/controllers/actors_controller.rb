require 'utility'
class ActorsController < ApplicationController
  protect_from_forgery
  before_filter :authenticate_account!
  #before_filter :authenticate_app!

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
  ##             "created_at"=>"2012-10-09T13:47:44Z", "updated_at"=>"2012-10-09T13:47:44Z",
  ##             "description"=>{"customer[address][city]"=>"Bangalore", "email"=>"john.doe@example.com"}, 
  ##          }
  def create
    Rails.logger.info("Enter Create Actor")

    # Create Anonymous actor
    params[:account_id] = current_account._id if Rails.env != "test"

    obj = Actor.create!(app_id: params[:app_id], account_id: params[:account_id])

    raise et("actor.create_failed") if obj.blank?

    params[:actor_id] = obj._id

    if !params[:properties].blank?
      ret = Actor.set(params)
      raise et("actor.create_failed_in_set_property") if !ret[:error].blank?
      obj = ret[:return]
    end

    hash = obj.reload.attributes
    hash["id"] = hash["_id"]
    hash.delete("_id")
    
    puts hash.inspect
    respond_with(hash, status: 200)
  rescue => e 
    Rails.logger.error("**** ERROR **** #{er(e)}")
    respond_with({ errors: e.message} , status: 422)
  end
  

  # NOTE
  ## Uniqly identify an actor..
  ## If not set an auto unique id is assigned to actor
  ## Also If not set, then a user coming from mobile and PC
  ## will be identified as two different user.
  ## Identify with Any unique id which business want - email or any other id

  # INPUT => 
  ## {
  ##   app_id:    "1234444',          [MANDATORY]
  ##   actor_id:  "23232323",         [OPTIONAL]  ## if not give anonymous actor is created and
  ##                                            ## if uid is not already existing in app_id then
  ##                                            ## the uid is assigned to anonymous actor otherwise  
  ##                                            ## actor_id of assigned actor is return
  ##   uid:  "john.doe@example.com"   [MANDATORY]
  ##   type:  "mobile"                [OPTIONAL]
  ## }


  # OUTPUT => {:actor_id => 1232323}
  def identify
    Rails.logger.info("Enter Actor Identify")

    params[:account_id] = current_account._id if Rails.env != "test"
    ret = Actor.identify(params)

    raise ret[:error] if !ret[:error].blank?

    respond_with({actor_id: ret[:return]}, status: 200 )
  rescue => e
    Rails.logger.error("**** ERROR **** #{er(e)}")
    respond_with({ errors: e.message} , status: 422)
  end

  # NOTE
  ## set the property of actor explicitly
  ## It sets both System property of Actor and Profile Properties of actor
  ## System Property - describes browser, location, OS etc auto extracted by rulebot script
  ## Profile Property - describes property of actor which a business want to set like "gender", "dob" etc

  # INPUT
  ## {
  ##  :type => "system" or "profile"
  ##  :app_id => "1234444',   [MANDATORY]
  ##  :actor_id => "1223343", [MANDATORY]  
  ##  :properties => {        [MANDATORY] ## either system or profile property must be there
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
  ##             "created_at"=>"2012-10-09T13:47:44Z", "updated_at"=>"2012-10-09T13:47:44Z",
  ##             "description"=>{"customer[address][city]"=>"Bangalore", "email"=>"john.doe@example.com"}, 
  ##          }


  def set
    Rails.logger.info("Enter Actor Set")

    params[:account_id] = current_account._id if Rails.env != "test"

    ret = Actor.set(params)

    raise ret[:error] if !ret[:error].blank?

    hash = ret[:return].attributes
    hash["id"] = hash["_id"]
    hash.delete("_id")

    respond_with( hash, status: 200)
  rescue => e
    Rails.logger.error("**** ERROR **** #{er(e)}")
    respond_with({ errors: e.message} , status: 422)
  end

  # NOTE
  ## set a new identifier(alias) of actor

  # INPUT
  ## {
  ##   app_id: "1234444',            [MANDATORY]
  ##   uid: "john.doe@example.com",  [MANDATORY]
  ##   new_uid: "+1-9911231234"   [MANDATORY]
  ## }

  # OUTPUT => {:status => true}
  def alias
    Rails.logger.info("Enter Actor Alias")

    params[:account_id] = current_account._id if Rails.env != "test"
    ret = Actor.alias(params)

    raise ret[:error] if !ret[:error].blank?

    respond_with({status: ret[:return]}, status: 200)

  rescue => e 
    Rails.logger.error("**** ERROR **** #{er(e)}")
    respond_with({ errors: e.message} , status: 422)
  end

  # NOTE
  ## Read Actor Data

  # INPUT
  ## {
  ##   app_id: "1234444',            [MANDATORY]
  ##
  ##   actor_id: "3433434",          [OPTIONAL] 
  ##           OR
  ##   uid: "john.doe@example.com",  [OPTIONAL] 
  ##
  ##   identifiers: true or false    [OPTIONAL] # associated identifiers 
  ##   events: true or false         [OPTIONAL] # events  
  ##   conversions: true or false    [OPTIONAL] # conversion
  ##   errors: true or false         [OPTIONAL] # errors
  ## }

  # OUTPUT => {
  ##            account: {id: "232342343"}
  ##            app: {id: "234324"}
  ##
  ##            actor: {id: "3433434", description:  { profile: {  "name": ["John Doe"],   "email": ["john@doe.com"] }, system: {os: ["win", "mac"]}} }
  ##            identifiers: [{"a@b.com" => "email"}, {"9999999" => "mobile"}, {"34433444" => "facebook_uid"}],
  ##
  ##            events: [
  ##                      {
  ##                         id: "3232342434", name: "sign_in", 
  ##                         properties: [{"k" => "name", "v" => "alok"}, {"k" => "address[city]", "v" => "Bangalore"}]
  ##                         time: 2009-02-19 00:00:00 UTC
  ##                      },
  ##                      {...}
  ##                    ],
  ##            conversions: [
  ##                            {
  ##                              id: "32323424355",
  ##                              properties: [{"k" => "button", "v" => "clicked"}, {"k" => "times", "v" => "40"}]
  ##                              time: 2009-02-19 23:00:00 UTC
  ##                            },
  ##                            {...}
  ##                         ],
  ##            errors: [
  ##                       {
  ##                          id: "3232342434",
  ##                          properties: [{"k" => "name", "v" => "Javascript Error"}, {"k" => "reason", "v" => "dont know"}]
  ##                          time: 2009-02-19 21:00:00 UTC
  ##                       },
  ##                       {...}
  ##                    ],
  ##          }
  def read
    Rails.logger.info("Enter Actor Read")

    params[:account_id] = current_account._id if Rails.env != "test"
    ret = Actor.read(params)

    raise ret[:error] if !ret[:error].blank?

    respond_with(ret[:return], status: 200)

  rescue => e 
    Rails.logger.error("**** ERROR **** #{er(e)}")
    respond_with({ errors: e.message} , status: 422)
  end
end
