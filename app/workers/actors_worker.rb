require 'pub_sub'

class ActorsWorker
  include Sidekiq::Worker  
  sidekiq_options retry: false
  
  def perform(params)
    Rails.logger.info("Actor Worker Perform")

    ret = {:return => nil, :error => nil}

    case params["action"]
    when "create"
      ret = ActorsWorker.create(params)
    when "read"
      ret = ActorsWorker.read(params)
    when "delete"
      ret = ActorsWorker.delete(params)
    when "identify"
      ret = ActorsWorker.identify(params)
    when "set"
      ret = ActorsWorker.set(params)
    when "alias"
      ret = ActorsWorker.alias(params)
    else
      raise "Method does not exist"
    end       

    raise ret[:error] if !ret[:error].blank?

    ret
  rescue => e
    Rails.logger.error("**** ERROR **** #{er(e)}")
    {:return => nil, :error => ret[:error]}
  end  

  # INPUT - Check ActorsController#create
  # OUTPUT - Check ActorsController#create [sync mode]
  def self.create(params)
    Rails.logger.info("Enter Actor Create")
    
    ret = Actor.add!(params) 
    
    raise ret[:error] if !ret[:error].blank?
    
    h = {:return => ret[:return].format_actor, :error => nil}
    # PubSub.publish(channel: "test_channel", event: "my_event", data: h)
    
    h
  rescue => e
    {:return => nil, :error => ret[:error]}
  end

  # INPUT - Check ActorsController#delete
  # OUTPUT - Check ActorsController#delete [sync mode]
  def self.delete(params)
    Rails.logger.info("Enter Actor Delete")
    
    Actor.where(account_id: params["account_id"] , _id: params["id"]).destroy
    
    {:return => {status: true}, :error => nil} 
   rescue => e
    {:return => nil, :error => ret[:error]}
  end

  # INPUT - Check ActorsController#create
  # OUTPUT - Check ActorsController#create [sync mode]
  def self.identify(params)
    Rails.logger.info("Enter Actor Identify")

    ret = Actor.identify(params)

    raise ret[:error] if !ret[:error].blank?

    {:return => {id: ret[:return]}, :error => nil }
  rescue => e
    {:return => nil, :error => ret[:error]}
  end

  # INPUT - Check ActorsController#set
  # OUTPUT - Check ActorsController#set [sync mode]
  def self.set(params)
    Rails.logger.info("Enter Actor Set")

    ret = Actor.set(params)

    raise ret[:error] if !ret[:error].blank?

    {:return => ret[:return].format_actor, :error => nil }
  rescue => e
    {:return => nil, :error => ret[:error]}
  end

  # INPUT - Check ActorsController#alias
  # OUTPUT - Check ActorsController#alias [sync mode]
  def self.alias(params)
    Rails.logger.info("Enter Actor Alias")

    ret = Actor.alias(params)

    raise ret[:error] if !ret[:error].blank?

    {:return => {status: ret[:return]}, :error => nil }
  rescue => e
    {:return => nil, :error => ret[:error]}
  end

  # INPUT - Check ActorsController#read
  # OUTPUT - Check ActorsController#read [sync mode]
  def self.read(params)
    Rails.logger.info("Enter Actor Read")

    ret = Actor.read(params) 
    
    raise ret[:error] if !ret[:error].blank?
      
    {:return => ret[:return], :error => nil}
  rescue => e
    {:return => nil, :error => ret[:error]}
  end
end