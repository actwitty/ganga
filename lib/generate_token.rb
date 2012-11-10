require 'digest'
module GenerateToken
  def self.unique_token
    (Digest::MD5.hexdigest "#{ActiveSupport::SecureRandom.hex(10)}-#{DateTime.now.to_s}")
  end
end