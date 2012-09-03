require 'faraday'
require 'em-http-request'
require 'pp'
require 'faraday_middleware/parse_oj'


def faraday_example(message)
	if !EM.reactor_running?
	  Thread.new {
		EM.run 
	  }
	end
	# Repos: 
	# https://github.com/technoweenie/faraday
	# https://github.com/pengwynn/faraday_middleware

	# Blog posts: 
	# http://adventuresincoding.com/2010/09/writing-modular-http-client-code-with-faraday
	# http://wynnnetherland.com/projects/faraday-middleware

	conn = Faraday::Connection.new(:url => 'https://api.twitter.com/1/users/lookup.json?screen_name=twitterapi,twitter&include_entities=true') do |builder|
	  builder.use Faraday::Adapter::EMHttp 
	  builder.response :oj       # parse body with Oj  
	end

	resp = conn.in_parallel do 
	  3.times { |i|
	  	
	  	resp  = conn.get {
	  		puts "#{message}#{i}"
	  	}
	  }
	end

	#pp resp	
	puts message
end

5.times {|i|
	faraday_example(i)
	puts "hello"
}
	
