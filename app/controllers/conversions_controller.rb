class ConversionsController < ApplicationController
	protect_from_forgery
  authenticate_request( origin: { only: ["create"] } )

  respond_to :json

  # NOTE
  ## create a conversion

  # INPUT
  ## {
  ##  :app_id => "1234444',   [MANDATORY]
  ##  :actor_id => "1223343", [MANDATORY]  # if not given, anonymous actor is created
  ##  :properties => {        [MANDATORY]
  ##      :button => "clicked",
  ##      :times => "40"
  ##   }
  ## }

  # OUTPUT =>
  ##[sync call] 
  ##         {
  ##              "id"=>"50838a5e63fe85d820000005", 
  ##
  ##              "account_id"=>"50838a5e63fe85d820000004", 
  ##
  ##              "actor_id"=>"50838a5e63fe85d820000003",
  ##
  ##              "app_id"=>"50838a5e63fe85d820000002",
  ##             
  ##              "properties"=>[
  ##                               {"k"=>"button", "v"=>"clicked"}, 
  ##                               {"k"=>"times", "v"=>"40"},
  ##                            ], 
  ##              "updated_at"=>"2012-10-21T05:38:38Z",   "created_at"=>"2012-10-21T05:38:38Z",
  ##          }
  ##[async call]
  ##          {status: true}

  def create
    Rails.logger.info("Enter Conversion Create")

    ret = {:return => {status: true}, :error => nil}

    params[:account_id] = current_account._id.to_s 
    params[:method] = "create"
    
    if params[:sync]
      ret = ConversionsWorker.create(params)
    else
      ConversionsWorker.perform_async(params)
    end  
    
    raise ret[:error] if !ret[:error].blank?

    respond_with( ret[:return], status: 200, location: "nil")
  rescue => e 
    Rails.logger.error("**** ERROR **** #{er(e)}")
    respond_with({ errors:  e.message}, status: 422, :location => "nil")
  end  
end
