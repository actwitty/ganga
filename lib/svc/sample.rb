require 'sample/actions'
require 'sample/triggers'
# NOTE - A Template SVC

module Svc
	module Sample

    # NOTE: method_missing helps if due to some  reason config is 
    # not loaded...push.  it will defin config and config= and 
    # load config/sample.yml 
    def self.method_missing(name, *args, &block)
      Rails.logger.info("Enter Method Missing")

      if name.to_s == "config"
        key = self.name.underscore.split('/')[1]
        thing = YAML.load_file("#{Rails.root}/config/svcs/#{key}.yml")

        self.instance_eval %Q?
          def config=(val)
            @config=val
          end
          def config
            @config
          end
        ?       
        self.send("config=", thing["svc"][key])
      end
    rescue => e
      Rails.logger.error("**** ERROR **** => #{e.message}")
      {}
    end
  end
end