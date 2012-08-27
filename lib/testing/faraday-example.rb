require 'faraday'
require 'net/http'
require 'pp'
require 'faraday_middleware/parse_oj'


# Repos: 
# https://github.com/technoweenie/faraday
# https://github.com/pengwynn/faraday_middleware

# Blog posts: 
# http://adventuresincoding.com/2010/09/writing-modular-http-client-code-with-faraday
# http://wynnnetherland.com/projects/faraday-middleware

conn = Faraday::Connection.new(:url => 'https://api.twitter.com') do |builder|
  builder.use Faraday::Adapter::EMSynchrony 
  builder.response :oj       # parse body with Oj
end

resp = conn.get do |req| 
  req.url "/1/users/lookup.json?screen_name=twitterapi,twitter&include_entities=true"
end

pp resp
puts

# Set EM-Synchrony to be default drive + parse JSON responses

Faraday.default_connection = Faraday::Connection.new do |builder|
  builder.use Faraday::Adapter::EMSynchrony 
  builder.response :oj   
end

resp = Faraday.get "https://api.twitter.com/1/users/show.json?screen_name=TwitterAPI&include_entities=true"
pp resp

puts "yay"
