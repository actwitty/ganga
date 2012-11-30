require 'svc/full_contact'
require 'svc/gmail'
require 'svc/mail_chimp'
require 'svc/sample'

module Svc 
  def self.load!
    Rails.logger.info("Enter SVC Load")

    Dir.glob('./config/svcs/*.yml') do |rb_file|
      thing = YAML.load_file(rb_file)
      key = thing["svc"].keys[0]

      klass = Object.const_get("#{self.name}").const_get(key.camelize)

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
  rescue => e
    Rails.logger.error("**** ERROR **** => #{e.message}")
  end  
end