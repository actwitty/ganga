class ConversionsController < ApplicationController
	protect_from_forgery
  before_filter :authenticate_account!
  #before_filter :authenticate_app!

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
  ##                               {"k"=>"button", "v"=>"clicked"}, 
  ##                               {"k"=>"times", "v"=>"40"},
  ##                            ], 
  ##              "updated_at"=>"2012-10-21T05:38:38Z",   "created_at"=>"2012-10-21T05:38:38Z",
  ##          }
  def create
    Rails.logger.info("Enter Conversion Create")
    
    params[:account_id] = current_account._id 
    ret = Conversion.add!(params)

    raise ret[:error] if !ret[:error].blank?

    respond_with(ret[:return].format_conversion, status: 200)
  rescue => e
    Rails.logger.error("**** ERROR **** #{er(e)}")
    respond_with({errors: e.message}, status: 422)
  end 
  
end
