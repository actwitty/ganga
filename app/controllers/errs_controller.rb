class ErrsController < ApplicationController
	protect_from_forgery
  authenticate_request( origin: { only: ["create"] } )

  respond_to :json

  # NOTE
  ## create an error

  # INPUT
  ## {
  ##  :app_id => "1234444',   [OPTIONAL]
  ##  :actor_id => "1223343", [OPTIONAL]  
  ##  :properties => {            [MANDATORY]
  ##      :name => "Javascript failed",
  ##      :reason => "dont know"
  ##   }
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
  ##              "properties"=>[
  ##                              {"k"=>"name", "v"=>"Javascript failed"}, 
  ##                              {"k"=>"reason", "v"=>"dont know"},
  ##                            ], 
  ##              "updated_at"=>"2012-10-21T05:38:38Z",   "created_at"=>"2012-10-21T05:38:38Z",
  ##          }
  def create
    Rails.logger.info("Enter Error Create")
    
    params[:account_id] = current_account._id 
    ret = Err.add!(params)

    raise ret[:error] if !ret[:error].blank?

    respond_with(ret[:return].format_err, status: 200, location: "nil")
  rescue => e
    Rails.logger.error("**** ERROR **** #{er(e)}")
    respond_with({errors: e.message}, status: 422, location: "nil")
  end  
end
