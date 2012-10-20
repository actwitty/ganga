class EventsController < ApplicationController
	#before_filter :authenticate_account!
  protect_from_forgery

	# NOTE
  ## create a event

  # INPUT
  ## {
  ##  :app_id => "1234444',   [MANDATORY]
  ##  :actor_id => "1223343", [OPTIONAL]  #if not given, anonymous actor is created
  ##  :event =>    "sign_up", [MANDATORY] # event name is case sensitive
  ##  :properties => {        [MANDATORY]
  ##      :email => "john.doe@example.com",
  ##      :customer => {:address => {:city => "Bangalore"}}}
  ## }

  # OUTPUT => {status: true}

  def create
    Rails.logger.info("Enter Event Create #{params.inspect}")

    params[:account_id] = '507be14e49f68a4627000001' #current_account._id
    ret = Event.add!(params)

    raise ret[:error] if !ret[:error].blank?

    render json: {status: ret[:return]}, status: 200

  rescue => e
    Rails.logger.error("**** ERROR **** #{er(e)}")
    render json: { errors: e , status: 422}
  end
end
