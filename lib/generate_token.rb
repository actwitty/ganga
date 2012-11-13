require 'digest'
module GenerateToken
  def self.unique_token
    (Digest::MD5.hexdigest "#{SecureRandom.hex(32)}-#{DateTime.now.to_s}")
  end
end