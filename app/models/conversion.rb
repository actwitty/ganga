class Conversion
  include Mongoid::Document
  include Mongoid::Timestamps

  # Relations
  belongs_to   :actor
  belongs_to   :app
  belongs_to   :account
  #embeds_many  :properties
  
  # Atrributes
  validates_presence_of :account_id, :actor_id, :app_id
  
  index({app_id: -1})
  index({actor_id: -1, app_id: -1})
  index({account_id: -1})

  field :properties,  type: Array,      default: []
  index({"properties.k" => -1, "properties.v" => -1})

  index({updated_at: -1})
  index({created_at: -1})

  # Callbacks

  # Functions

  # NOTE
  ## create a conversion

  # INPUT
  ## {
  ##  :account_id => "343434",[MANDATORY]
  ##  :app_id => "1234444',   [MANDATORY]
  ##  :actor_id => "1223343", [MANDATORY]  
  ##  :properties => {       [MANDATORY]
  ##      :button => "clicked",
  ##      :times => "40"
  ##   }
  ## }

  # OUTPUT => {:return => true, :error => nil}
  def self.add!(params)
    Rails.logger.info("Enter Conversions Add")
    
    if params[:account_id].blank? or params[:app_id].blank? or params[:actor_id].blank? or params[:properties].blank?
      raise et("conversion.invalid_argument_in_conversion") 
    end

    #check if app object is valid
    app = App.where(account_id: params[:account_id], _id: params[:app_id] ).first
    raise et("conversion.invalid_app_id") if app.blank?

    # check if actor object is valid
    actor = Actor.where(app_id: params[:app_id], _id: params[:actor_id]).first
    raise et("conversion.invalid_actor_id") if actor.blank?

    # Build conversion 
    conversion = new(account_id: params[:account_id], app_id: params[:app_id], actor_id: params[:actor_id])
   
    # serialize conversions
    serialized = Utility.serialize_to(hash: params[:properties], serialize_to: "value")   
    raise et("conversion.property_not_serialized") if serialized.blank?

    # add it to conversion object
    serialized.each do |k,v|
      #e.properties << Property.new(k: k, v: v)
      conversion.properties << {k: k, v: v}
    end

    # save conversion object
    conversion.save!  
    raise et("conversion.create_failed") if conversion.blank?

    {:return => conversion, :error => nil}  
  rescue => e
    Rails.logger.error("**** ERROR **** #{er(e)}")
    {:return => nil, :error => e}
  end

  def format_conversion
    {id: self._id.to_s, account_id: self.account_id.to_s, app_id: self.app_id.to_s, actor_id: self.actor_id.to_s, properties: self.properties, time: self.updated_at}
  rescue => e
    Rails.logger.error("**** ERROR **** #{e.message}")
    {}
  end
end
