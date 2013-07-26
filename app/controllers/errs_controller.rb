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
  ##                              {"k"=>"name", "v"=>"Javascript failed"}, 
  ##                              {"k"=>"reason", "v"=>"dont know"},
  ##                            ], 
  ##              "updated_at"=>"2012-10-21T05:38:38Z",   "created_at"=>"2012-10-21T05:38:38Z",
  ##          }
  ##[async call]
  ##          {status: true}

  def create
    Rails.logger.info("Enter Err Create")

    ret = {:return => {status: true}, :error => nil}
    
    if params[:sync]
      ret = ErrsWorker.create(params)
    else
      ErrsWorker.perform_async(params)
    end  
    
    raise ret[:error] if !ret[:error].blank?

    respond_with( ret[:return], status: 200, location: "nil")
  rescue => e 
    Rails.logger.error("**** ERROR **** #{er(e)}")
    respond_with({ errors:  e.message}, status: 422, :location => "nil")
  end

  # NOTE
  ## Read Errs

  # INPUT
  ## {
  ##  :app_id => "1234444',   [MANDATORY]
  ##  :filter => {            [MANDATORY]
  ##      :app => true  
  ##            OR
  ##      :account => true
  ##            OR
  ##      :actor => true
  ##      :actor_id => "21211313" [MANDATORY when actor: true]
  ##   }
  ## }

  # OUTPUT =>  
  ##[sync call]
  ##          [
  ##             {
  ##               properties: [{"k"=>"name", "v"=>"Javascript failed"}, {"k"=>"reason", "v"=>"dont know"},],
  ##               app_id: "343433433",
  ##               actor_id: "3434334",
  ##               account_id: "4446456456",
  ##               time: 2009-02-19 00:00:00 UTC
  ##             },
  ##             {..}
  ##          ],
  ##[async call]
  ##          {status: true}

  def read
    Rails.logger.info("Enter Err Read")

    ret = {:return => {status: true}, :error => nil}
    
    if params[:sync]
      ret = ErrsWorker.read(params)
    else
      ErrsWorker.perform_async(params)
    end  
    
    raise ret[:error] if !ret[:error].blank?

    respond_with( ret[:return], status: 200, location: "nil")
  rescue => e 
    Rails.logger.error("**** ERROR **** #{er(e)}")
    respond_with({ errors:  e.message}, status: 422, :location => "nil")
  end  
end
