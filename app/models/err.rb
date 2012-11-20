class Err
  include Mongoid::Document
  include Mongoid::Timestamps

  # Relations
  belongs_to   :actor
  belongs_to   :app
  belongs_to   :account
  #embeds_many  :properties
  
  # Atrributes
  validates_presence_of :account_id
  
  index({app_id: -1})
  index({actor_id: -1, app_id: -1})
  index({account_id: -1})

  field :properties,  type: Array,      default: []
  index({"properties.k" => -1, "properties.v" => -1})


  # Callbacks

  # Functions

  # NOTE
  ## create an error

  # INPUT
  ## {
  ##  :account_id => "343434",[MANDATORY]
  ##  :app_id => "1234444',   [OPTIONAL]
  ##  :actor_id => "1223343", [OPTIONAL]  
  ##  :properties => {            [MANDATORY]
  ##      :name => "Javascript failed",
  ##      :reason => "dont know"
  ##   }
  ## }

  # OUTPUT => {:return => true, :error => nil}
  def self.add!(params)
    Rails.logger.info("Enter Errors Add")
    
    if params[:account_id].blank? or  params[:properties].blank?
      raise et("err.invalid_argument_in_error") 
    end

    #check if app object is valid
    if !params[:app_id].blank?
      app = App.where(account_id: params[:account_id], _id: params[:app_id] ).first
      raise et("err.invalid_app_id") if app.blank?
    end

    # check if actor object is valid
    if !params[:actor_id].blank?
      actor = Actor.where(app_id: params[:app_id], _id: params[:actor_id]).first
      raise et("err.invalid_actor_id") if actor.blank?
    end    

    # Build error 
    err = new(account_id: params[:account_id], app_id: params[:app_id], actor_id: params[:actor_id])
   
    # serialize errors
    serialized = Utility.serialize_to(hash: params[:properties], serialize_to: "value")   
    raise et("err.property_not_serialized") if serialized.blank?

    # add it to error object
    serialized.each do |k,v|
      #e.properties << Property.new(k: k, v: v)
      err.properties << {k: k, v: v}
    end

    # save error object
    err.save!  
    raise et("err.create_failed") if err.blank?

    {:return => err, :error => nil}  
  rescue => e
    Rails.logger.error("**** ERROR **** #{er(e)}")
    {:return => nil, :error => e}
  end

  def format_err
    {id: self._id.to_s, account_id: self.account_id.to_s, app_id: self.app_id.to_s, actor_id: self.actor_id.to_s, properties: self.properties, time: self.updated_at}
  rescue => e
    Rails.logger.error("**** ERROR **** #{e.message}")
    {}
  end
end
