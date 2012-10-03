require 'utility'
class ActorsController < ApplicationController
  before_filter :authenticate_account!
  protect_from_forgery

  # NOTE
  ## Uniqly identify an actor..
  ## If not set an auto unique id is assigned to actor
  ## Also If not set, then for example a user coming from mobile and PC
  ## will be identified as two different user.
  ## Identiy Any unique id which business want - email or any other id

  # INPUT => {:app_id => "1234444',
  ##          :actor_id => "23232323"
  ##          :uid => "john.doe@example.com"}

  # OUTPUT => {status: true OR false}
  def identify
    Rails.logger.info("Enter Actor Identify")

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
  ## {:app_id => "1234444',
  ##  :actor_id => "1223343",
  ##  :properties => {
  ##  		:email => "john.doe@example.com",
  ##      :customer => {:address => {:city => "Bangalore"}}}
  ## }

  # OUTPUT => {status: true}

  def set
    Rails.logger.info("Enter Actor Set")

    ret = Actor.set(params)

    raise ret[:error] if !ret[:error].blank?

    render json: {status: ret[:return]}, status: 200

  rescue => e
     Rails.logger.error("**** ERROR **** #{er(e)}")
    render json: { errors: e , status: 422}
  end

  # NOTE
  ## set a new identifier(alias) of actor

  # INPUT
  ## {app_id: "1234444',
  ##  actor_id: "1223343",
  ##  uid: "john.doe@example.com", 
  ##  identifier: "+1-9911231234"
  ## }

  # OUTPUT => {status: true}
  def alias
    Rails.logger.info("Enter Actor Alias")

    ret = Actor.alias(params)

    raise ret[:error] if !ret[:error].blank?

    render json: {status: ret[:return]}, status: 200

  rescue => e 
    Rails.logger.error("**** ERROR **** #{er(e)}")
    render json: { errors: e , status: 422}
  end
end
