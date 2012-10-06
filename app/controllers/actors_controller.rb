require 'utility'
class ActorsController < ApplicationController
  before_filter :authenticate_account!
  before_filter :authenticate_app!
  protect_from_forgery


  # NOTE
  ## Creates an actor..
  
  # INPUT => 
  ## {
  ##  :app_id => "1234444',   [MANDATORY]
  ##  :properties => {        [OPTIONAL]
  ##      :email => "john.doe@example.com",
  ##      :customer => {:address => {:city => "Bangalore"}}}
  ## }

  # OUTPUT => {:return => actor_id, :error => nil}
  def create
    Rails.logger.info("Enter Create Actor")

    # Create Anonymous actor
    params[:account_id] = current_account._id
    obj = Actor.create!(app_id: params[:app_id], account_id: params[:account_id])

    raise et("actor.create_failed") if obj.blank?

    if !params[:properties].blank?
      params[:name] = AppConstants.event_set_actor_property
      ret = Event.add!(params)
      if !ret[:error].blank?
        Rails.logger.warn("^^^^ WARN ^^^^ #{ret[:error].message}")
      end
    end

    render json: {object: obj}, status: 200 
  rescue => e 
    Rails.logger.error("**** ERROR **** #{er(e)}")
    render json: { errors: e , status: 422}
  end
  # NOTE
  ## Uniqly identify an actor..
  ## If not set an auto unique id is assigned to actor
  ## Also If not set, then for example a user coming from mobile and PC
  ## will be identified as two different user.
  ## Identiy Any unique id which business want - email or any other id

  # INPUT => 
  ## {
  ##  :app_id => "1234444',          [MANDATORY]
  ##  :actor_id => "23232323",       [OPTIONAL] ## if not give anonymous actor is created and
  ##                                            ## if uid is not already existing in app_id then
  ##                                            ## the uid is assigned to anonymous actor otherwise  
  ##                                            ## actor_id of assigned actor is return
  ##  :uid => "john.doe@example.com" [MANDATORY]
  ## }

  # OUTPUT => {:return => actor_id, :error => nil}
  def identify
    Rails.logger.info("Enter Actor Identify")

    params[:account_id] = current_account._id
    ret = Actor.identify(params)

    raise ret[:error] if !ret[:error].blank?

    render json: {actor_id: ret[:return]}, status: 200 
  rescue => e
    Rails.logger.error("**** ERROR **** #{er(e)}")
    render json: { errors: e , status: 422}
  end

  # NOTE
  ## set the property of actor explicitly

  # INPUT
  ## {
  ##  :app_id => "1234444',   [MANDATORY]
  ##  :actor_id => "1223343", [MANDATORY]  
  ##  :properties => {        [MANDATORY]
  ##      :email => "john.doe@example.com",
  ##      :customer => {:address => {:city => "Bangalore"}}}
  ## }

  # OUTPUT => {status: true}

  def set
    Rails.logger.info("Enter Actor Set")

    if params[:actor_id].blank?
      raise et("actor.invalid_argument_in_set") 
    end

    params[:account_id] = current_account._id
    params[:name] = AppConstants.event_set_actor_property

    ret = Event.add!(params)

    raise ret[:error] if !ret[:error].blank?

    render json: {status: ret[:return]}, status: 200

  rescue => e
    Rails.logger.error("**** ERROR **** #{er(e)}")
    render json: { errors: e , status: 422}
  end

  # NOTE
  ## set a new identifier(alias) of actor

  # INPUT
  ## {
  ##   app_id: "1234444',            [MANDATORY]
  ##   actor_id: "1223343",          [MANDATORY]
  ##   uid: "john.doe@example.com",  [MANDATORY]
  ##   identifier: "+1-9911231234"   [MANDATORY]
  ## }

  # OUTPUT => {:return => true, :error => nil}
  def alias
    Rails.logger.info("Enter Actor Alias")

    params[:account_id] = current_account._id
    ret = Actor.alias(params)

    raise ret[:error] if !ret[:error].blank?

    render json: {status: ret[:return]}, status: 200

  rescue => e 
    Rails.logger.error("**** ERROR **** #{er(e)}")
    render json: { errors: e , status: 422}
  end
end
