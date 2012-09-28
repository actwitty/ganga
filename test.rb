require 'rubygems'
require 'uri'
require 'mongo'

str = 'mongodb://heroku_app6991080:19ucpel6nqcb60jn91jc1ij7he@ds039027.mongolab.com/heroku_app6991080'
uri  = URI.parse(str)
puts str.scan(%r{//(.*):(.*)@(.*)/(.*)}).first
conn = Mongo::Connection.from_uri('mongodb://heroku_app6991080:19ucpel6nqcb60jn91jc1ij7he@ds039027.mongolab.com:27007/heroku_app6991080')
db   = conn.db(uri.path.gsub(/^\//, ''))
db.collection_names.each { |name| puts name }
puts "hello"
