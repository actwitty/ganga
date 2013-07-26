class AppsCache

  # INPUT - origin ## for example - base of origin like "actwitty.com"
  # OUTPUT - {id: "32423423423", account_id: "3233432423"}
  def self.access_origin(origin_base)
    Rails.cache.fetch("app_origin_#{origin_base}") do 
      app = App.where("access_origin.origin_base" => origin_base).first
      app ? {id: app._id.to_s, account_id: app.account_id.to_s} : {}
    end
  end

  # INPUT - id ## app id
  # OUTPUT - app object
  def self.object(id)
    Rails.cache.fetch("app_object_#{id}") do 
      App.where(:_id => id).first
    end
  end
end