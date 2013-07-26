require 'svc/full_contact'
require 'svc/gmail'
require 'svc/mail_chimp'
require 'svc/sample'

# NOTE - A Service offers either Triggers or Actions or both
#        Trggers - Events happening within service itself.. Like new mail event in gmail, new file added in folder in Dropbox
#        Actions - Hooks which service offer as REST API (mostly).. Like New File Creatiion API, Mail Delete API by Gmail etc..
module Svc 
  @@svc_classes ={}

  def self.svc_classes
    @@svc_classes
  end

  # NOTE - Loads config accessor and setter in service classes like Svc::FullContact, Svc::Gmail
  #        Called from config/initializers/svcs.rb
  def self.load!
    Rails.logger.info("Enter SVC Load")
    
    Dir.glob('./config/svcs/*.yml') do |rb_file|
      thing = YAML.load_file(rb_file)

      # e.g- "full_contact", "gmail"
      key = thing["svc"].keys[0]

      # Like Svc::FullContact
      klass = Object.const_get("#{self.name}").const_get(key.camelize)

      # cache the classes for faster 
      @@svc_classes[key] = { "svc" => klass}

      klass.constants.each do |konst|
        # like Svc::FullContact::Actions
        sub_klass = "#{klass}::#{konst}".constantize 

        # verify if it is a class or normal constant
        if "#{klass}::#{konst}".constantize.is_a?(Class)
          # add hash key like "actions" .. { svc: Svc::FullContact, actions: Svc::FullContact::Actions..}
          @@svc_classes[key][konst.to_s.underscore] = sub_klass
        end
      end

      klass.instance_eval %Q?
        def config=(val)
          @config=val
        end
        def config
          @config
        end
      ?
      klass.send("config=", thing["svc"][key])
    end

    # Load Api Keys or Auth Keys for services provided by us
    Dir.glob('./config/keys/*.yml') do |rb_file|

      thing = YAML.load_file(rb_file)
      
      # e.g- "full_contact", "gmail"
      key = thing["key"].keys[0]

      # Like Svc::FullContact
      klass = Object.const_get("#{self.name}").const_get(key.camelize)
      klass.instance_eval %Q?
        def key
          #{thing["key"][key]}
        end
      ?
    end
  rescue => e
    Rails.logger.error("**** ERROR **** => #{e.message}")
  end  

  # NOTE- Executes Services
  # INPUT - {
  #   type: "action",
  #   name: "gmail",
  #   method: "send_mail",
  #   params: {....}
  # }
  def self.execute(params)
    Rails.logger.info("Enter Execute Service")   

    if params[:type].blank? or params[:name].blank? or params[:method].blank? or params[:params].blank?
      raise et("lib.svc.invalid_parameters_in_execute")
    end

    klass_hash = Svc.svc_classes[params[:name]] # Svc::Gmail
    method_hash = klass_hash["svc"].config["#{params[:type]}s"][params[:method]] # method's hash from like config/gmail.yml

    raise et("lib.svc.invalid_method_name") if method_hash.blank?

    # execution can be async, sync or Fbr synced
    execute = method_hash["execute"]
    execute = "fbr" if execute.blank?

    # check if mandatory params are present
    method_hash["params"].each do |k,v|
      raise et("lib.svc.mandatory_params_not_present") if v == "m" and params[:params][k].blank?
    end

    self.send("execute_#{execute}", {klass: klass_hash["#{params[:type]}s"], config: method_hash, params: params[:params], method: params[:method]})
    
  rescue => e
    Rails.logger.error("**** ERROR **** => #{e.message}")
  end

  # NOTE- Executes with EM and Fiber - Sync inside new fiber
  # INPUT - {
  #   klass: Svc::Gmail::Actions,
  #   config: { 
  #             "name"=>"Search by Email", 
  #             "execute"=>"fbr", 
  #             "end_point"=>"https://api.fullcontact.com/v2/person.json",
  #             "params"=>{"email"=>"m"},
  #             "request"=>"get"
  #           },  # Extracted from config/svc/gmail.yml ... actions#send_email
  #   method: "send_mail",
  #   params: {....}
  # }
  def self.execute_fbr(params)
    Rails.logger.info("Enter Execute fbr")
    
    CHttp::Fbr.sync do
      response = params[:klass].send(params[:method], { params: params[:params], klass: CHttp::Fbr, config: params[:config] })
    end
  rescue => e
    Rails.logger.error("**** ERROR **** => #{e.message}")
  end


  # NOTE- Executes with Net::Http - Sync
  # INPUT - {
  #   klass: Svc::Gmail::Actions,
  #   config: { 
  #             "name"=>"Search by Email", 
  #             "execute"=>"fbr", 
  #             "end_point"=>"https://api.fullcontact.com/v2/person.json",
  #             "params"=>{"email"=>"m"},
  #             "request"=>"get"
  #           },  # Extracted from config/svc/gmail.yml ... actions#send_email
  #   method: "send_mail",
  #   params: {....}
  # }
  def self.execute_sync(params)
    Rails.logger.info("Enter Execute Sync")
    response = params[:klass].send(params[:method], { params: params[:params], klass: CHttp::Sync, config: params[:config] })
  rescue => e
    Rails.logger.error("**** ERROR **** => #{e.message}")
  end

  # NOTE- Executes with EM - Async
  # INPUT - {
  #   klass: Svc::Gmail::Actions,
  #   config: { 
  #             "name"=>"Search by Email", 
  #             "execute"=>"fbr", 
  #             "end_point"=>"https://api.fullcontact.com/v2/person.json",
  #             "params"=>{"email"=>"m"},
  #             "request"=>"get"
  #           },  # Extracted from config/svc/gmail.yml ... actions#send_email
  #   method: "send_mail",
  #   params: {....}
  # }
  def self.execute_async(params)
    Rails.logger.info("Enter Execute Async")
    response = params[:klass].send( params[:method], { params: params[:params], klass: CHttp::Async, config: params[:config], cb:  "my_callback"})
  rescue => e
    Rails.logger.error("**** ERROR **** => #{e.message}")
  end
end