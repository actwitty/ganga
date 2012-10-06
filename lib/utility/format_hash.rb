module Utility
  class FormatHash
    # NOTE => Returns serialize for hash mapping to type 
    #         Depth First Traversal of hash 
    
    # INPUT => hash => {
    ##                    event:  {name: "sign_up", time: "2343434"}, 
    ##                    location: "Delhi", 
    ##                    property: {customer: {id: 123, 
    ##                               address: {city: "bangalore", 
    ##                                         geo: {lat: 2334.45, long: 34343.00}
    ##                                        }
    ##                              }
    ##                            }
    ##                 }
    ##        :serialize_to => "type" or "value" 

    # OUTPUT => {"property[customer][address][geo][long]"=>Float,
    ##           "property[customer][address][geo][lat]"=>Float,
    ##           "property[customer][address][city]"=>String,
    ##           "property[customer][id]"=>Fixnum,
    ##           "location"=>String,
    ##           "event[time]"=>String,
    ##           "event[name]"=>String
    ##           }

    def self.serialize_to(params)
      Rails.logger.info("Hash Serialize Enter")
      stack = []
      schema = {}

      raise "Invalid arguments in serialize_to" if params[:serialize_to].blank?
      # initialize stack
      params[:hash].map {|p| stack << [{p[0] => p[1]}, {:path => "#{p[0]}"}]}

      begin
        e = stack.pop  
        if e[0].values[0].class == Hash or (e[0].values[0].class == ActiveSupport::HashWithIndifferentAccess)
          # push nested hash info
          e[0].values[0].map {|p| stack << [{p[0] => p[1]}, {:path => "#{e[1][:path]}[#{p[0]}]"}]}
        else
          # process terminal element
          if params[:serialize_to] == "type"
            schema[e[1][:path]] = "#{e[0].values[0].class}"
          elsif params[:serialize_to] == "value"
            schema[e[1][:path]]= e[0].values[0]
          else
            raise "Invalid Parameter: :serialize_to =>  #{params[:serialize_to]}"
          end   
        end
      end while !stack.blank?
      schema
    rescue => e
      Rails.logger.error("**** ERROR **** => #{e.message}")
      {}
    end
  end
end
