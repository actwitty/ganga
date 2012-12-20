class ActorsWorker
  include Sidekiq::Worker
  sidekiq_options retry: false
  
  def perform(params)
    Rails.logger.info("Actor Worker Perform #{params.class}")

    ret = nil

    case params["method"]
    when "create"
      
    when "read"
      ret = Actor.read(params)
    when "delete"
      ret = Actor.
    when "identify"
    when "set"
    when "alias"
    end       
    raise ret[:error] if !ret[:error].blank?
    true
  rescue => e
    Rails.logger.error("**** ERROR **** #{er(e)}")
    false
  end

  def create_helper(params)
    Rail.logger.info("Entering Create Helper")
    
    obj = Actor.create!(app_id: params[:app_id], account_id: params[:account_id])
    raise et("actor.create_failed") if obj.blank?
    params[:id] = obj._id

    if !params[:properties].blank?
      ret = Actor.set(params)
      raise et("actor.create_failed_in_set_property") if !ret[:error].blank?
      obj = ret[:return]
    end

  rescue => e
    Rails.logger.error("**** ERROR **** #{er(e)}")
    false
  end
end