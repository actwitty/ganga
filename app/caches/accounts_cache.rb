class AccountsCache
	# INPUT - id ## app id
  # OUTPUT - account object
  def self.access_token(token)
    Rails.cache.fetch("account_token_#{token}") do 
      account = Account.where("access_token.token" => token).first
      account ? account._id.to_s : nil
    end
  end
end