class EventsController < ApplicationController
	protect_from_forgery
  authenticate_request( origin: { only: ["create"] } )

  respond_to  :json
	# NOTE
  ## create a event

  # INPUT
  ## {
  ##  :app_id => "1234444',   [MANDATORY]
  ##  :actor_id => "1223343", [OPTIONAL]  #if not given, anonymous actor is created
  ##  :name =>    "sign_up", [MANDATORY] # event name is case sensitive
  ##  :properties => {        [MANDATORY]
  ##      :email => "john.doe@example.com",
  ##      :customer => {:address => {:city => "Bangalore"}}}
  ## }

  # OUTPUT => {
  ##              "id"=>"50838a5e63fe85d820000005", 
  ##
  ##              "account_id"=>"50838a5e63fe85d820000004", 
  ##
  ##              "actor_id"=>"50838a5e63fe85d820000003",
  ##
  ##              "app_id"=>"50838a5e63fe85d820000002",
  ##             
  ##              "meta"=>false,
  ##              
  ##              "name"=>"sign_up", 
  ##
  ##              "properties"=>[
  ##                              {"k"=>"customer[address][place]", "v"=>["hello"]}, 
  ##                              {"k"=>"customer[address][city][name]", "v"=>"bangalore"},
  ##                              {"k"=>"customer[address][city][geo][long]", "v"=>"34"},
  ##                              {"k"=>"customer[address][city][geo][lat]", "v"=>"23"},
  ##                              {"k"=>"email", "v"=>"john.doe@example.com"}
  ##                            ], 
  ##              "updated_at"=>"2012-10-21T05:38:38Z",   "created_at"=>"2012-10-21T05:38:38Z",
  ##          }

  def create
    Rails.logger.info("Enter Event Create #{params.inspect}")

    params[:account_id] = current_account._id 
    ret = Event.add!(params)

    raise ret[:error] if !ret[:error].blank?

    respond_with(ret[:return].format_event, status: 200, location:  "nil")
  rescue => e
    Rails.logger.error("**** ERROR **** #{er(e)}")
    respond_with({errors: e.message}, status: 422, location: "nil")
  end
end
