class Conversion
  include Mongoid::Document
  include Mongoid::Timestamps

  # Relations
  belongs_to   :actor
  belongs_to   :app
  belongs_to   :account
  #embeds_many  :properties
  
  # Atrributes
  validates_presence_of :account_id,  :app_id
  
  index({app_id: -1})
  index({actor_id: -1})
  index({account_id: -1})

  field :properties,  type: Array,      default: []
  index({"properties.k" => -1, "properties.v" => -1})

  # Callbacks

  # Functions

  # NOTE
  ## create a conversion

  # INPUT
  ## {
  ##  :account_id => "343434",[MANDATORY]
  ##  :app_id => "1234444',   [MANDATORY]
  ##  :actor_id => "1223343", [OPTIONAL]  
  ##  :properties => {       [MANDATORY]
  ##      :button => "clicked",
  ##      :times => "40"
  ##   }
  ## }

  # OUTPUT => {:return => true, :error => nil}
  def self.add!(params)
    Rails.logger.info("Enter Conversions Add")
    
    if params["account_id"].blank? or params["app_id"].blank? or params["properties"].blank?
      raise et("conversion.invalid_argument_in_add_conversion") 
    end

    # for origin request type, app is laready verified
    # we are checking this, as app object is only needed for security..
    # app object is not important for busines logic in this case
    if params["request_type"] != AppConstants.request_type_origin
      app = AppsCache.object(params["app_id"] )

      if app.blank? or (app.account_id.to_s != params["account_id"])
        raise et("conversion.invalid_app_id") 
      end   
    end

    # Build conversion 
    conversion = new(account_id: params["account_id"], app_id: params["app_id"], actor_id: params["actor_id"])
   
    # serialize conversions
    serialized = Utility.serialize_to(hash: params["properties"], serialize_to: "value")   
    raise et("conversion.property_not_serialized") if serialized.blank?

    # add it to conversion object
    serialized.each do |k,v|
      #e.properties << Property.new(k: k, v: v)
      conversion.properties << {k: k, v: v}
    end

    # save conversion object
    conversion.save!  

    {:return => conversion, :error => nil}  
  rescue => e
    Rails.logger.error("**** ERROR **** #{er(e)}")
    {:return => nil, :error => e}
  end


  # NOTE
  ## Read conversions

  # INPUT
  ## {
  ##  :account_id => "343434",[MANDATORY]
  ##  :app_id => "1234444',   [MANDATORY]
  ##  :filter => {            [MANDATORY]
  ##      :app => true  
  ##            OR
  ##      :account => true
  ##            OR
  ##      :actor => true
  ##      :actor_id => "21211313" [MANDATORY when actor: true]
  ##   }
  ## }

  # OUTPUT =>  [
  ##             {
  ##               properties: [{"k" => "button", "v" => "clicked"}, {"k" => "times", "v" => "40"}],
  ##               app_id: "343433433",
  ##               actor_id: "3434334",
  ##               account_id: "4446456456",
  ##               time: 2009-02-19 00:00:00 UTC
  ##             },
  ##             {..}
  ##          ],
  def self.read(params)
    Rails.logger.info("Enter Conversion Read")

    return et("conversion.invalid_argument_in_read") if params["account_id"].blank? or params["app_id"].blank? or params["filters"].blank?

    array = []
    if params["filters"]["app"]
      conversions = Conversion.where( app_id: params["app_id"] ).limit(AppConstants.limit_events).desc(:_id)
      conversions.each {|attr| array << attr.format_conversion }
      Rails.logger.info("Adding App Conversions")

    elsif params["filters"]["account"]
      conversions = Conversion.where( account_id: params["account_id"]).limit(AppConstants.limit_events).desc(:_id)
      conversions.each { |attr| array << attr.format_conversion }
      Rails.logger.info("Adding Account Conversions")

    elsif params["filters"]["actor"]
      conversions = Conversion.where(actor_id: params["filters"]["actor_id"]).limit(AppConstants.limit_events).desc(:_id)
      conversions.each {|attr| array << attr.format_conversion}
      Rails.logger.info("Adding Actors Conversions")   
    end

    {:return => array, :error => nil}  
  rescue => e
    Rails.logger.error("**** ERROR **** #{er(e)}")
    {:return => [], :error => e}
  end

  #NOTE - formats an converion object to be sent
  def format_conversion
    { account_id: self.account_id.to_s, app_id: self.app_id.to_s, actor_id: self.actor_id.to_s, properties: self.properties, time: self.updated_at}
  rescue => e
    Rails.logger.error("**** ERROR **** #{e.message}")
    {}
  end
end
