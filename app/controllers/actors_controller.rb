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

  # OUTPUT => {status: true}
  def identify
    Rails.logger.info("Enter Actor Identify")

    # check if this user exists already
    a = Alias.where(app_id: params[:app_id], uid: params[:uid]).first

    # its a case when identity is called more than once in a session
    # we should treat it as different person
    if params[:actor_id].blank?
      # if this is new actor
      if a.blank?
        actor = Actor.create!(app_id: params[:app_id])
        actor.aliases.create!(app_id: params[:app_id], uid: params[:uid])
        Rails.logger.info("creating new and new alias")
      
      else
        actor = Actor.find(a.actor_id)
        raise __et("actors.no_actor") if actor.blank?
        raise __et("actors.wrong_actor") if a.actor_id != params[:actor_id]
        Rails.logger.info("Alias exists so returning the associated actor")
      end
    
    else
      # create alias for the actor
      if a.blank?
        a = Alias.create!(app_id: params[:app_id], actor_id: params[:actor_id], uid: params[:uid])
      else
        raise __et("actors.already_in_use", uid: params[:uid] ) if a.actor_id != params[:actor_id]
        actor = Actor.find(params[:actor_id])
      end
    end
    render json: {status: true}, status: 200
  rescue => e
    puts("**** ERROR **** #{self.__err_default}")
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
    Rails.logger.info("Enter Set Property of Actor")

    if !params[:properties].blank?
      #get app object
      app = App.find(params)

      params[:properties].each do |k,v|
        p = Property.create(actor_id: params[:actor_id], k.to_sym => v)

        schema = Utility.hash_serialize(hash: properties)
        # add schema in app
        app.schema[:actor] = {} if app.schema[:actor].blank?
        app.schema[:actor].merge!(schema)
      end

      render json: {status: true}, status: 200
    else
      raise __et("actors.no_property")
    end

  rescue => e
    Rails.logger.error("**** ERROR **** #{e.message}")
    render json: { errors: e , status: 422}
  end

  # NOTE
  ## set the property of actor explicitly

  # INPUT
  ## {app_id: "1234444',
  ##  actor_id: "1223343",
  ##  uid: "john.doe@example.com", 
  ##  alias_uid: "+1-9911231234"
  ## }

  # OUTPUT => {status: true}
  def alias
    Rails.logger.info("Enter Actor Alias")

    # check if this user exists already
    uid = Alias.where(app_id: params[:app_id], uid: params[:uid] ).first
    raise __et("actors.no_uid", uid: params[:uid], app_id: params[:app_id]) if uid.blank? 
    raise __et("actors.no_actor") if uid.actor_id != params[:actor_id]

    # check if alias is already exists with this actor
    a = Alias.where(app_id: params[:app_id], uid: params[:alias_uid], actor_id: params[:actor_id]).first
    
    if a.blank?   
      Alias.create!(app_id: params[:app_id], actor_id: params[:actor_id], uid: params[:alias_uid] )
    end

    render json: {status: true}, status: 200
  rescue => e 
    Rails.logger.error("**** ERROR **** #{e.message}")
    render json: { errors: e , status: 422}
  end
end
