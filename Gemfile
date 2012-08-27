source 'https://rubygems.org'

gem 'rails', '3.2.8'

gem 'heroku'

# Gems used only for assets and not required
# in production environments by default.
group :assets do
  gem 'sass-rails',   '~> 3.2.3'
  gem 'coffee-rails', '~> 3.2.1'

  # See https://github.com/sstephenson/execjs#readme for more supported runtimes
  # gem 'therubyracer'

  gem 'uglifier', '>= 1.0.3'
end

gem 'jquery-rails'


#annotate models
gem 'annotate'

#algorithms
gem 'algorithms'

#Authentication
gem 'devise'

#Inflected translations
gem 'i18n-inflector-rails'
gem 'rails-i18n'

#Uncatagorized
gem 'addressable' 

#JSON and API
gem 'oj' #fast json parser
gem 'acts_as_api'

#Parsers
gem 'nokogiri'
gem 'roxml'


#Manages constants
gem 'app_constants'


#for http client Adaptor 
gem 'faraday'
gem 'faraday_middleware'
gem 'faraday_middleware-parse_oj' #to register Oj json parser in faraday middleware

#for asynchronous web-socket
gem 'em-http-request'
gem 'em-synchrony'


#Social 
gem 'koala' #for facebook
gem "twitter"
gem 'meta-tags', :require => 'meta_tags'  #Facebook meta tags

#thin Webserver
gem 'thin'

#haml
gem 'haml-rails'

#to enable detect mobile devices that access  Rails application
gem 'mobile-fu'


#For instance, in a social network, a user might have tags that are called skills, interests, sports, and more. 
#There is no real way to differentiate between tags and so an implementation of this type is not possible with acts as taggable on steroids.
#Rather than tying functionality to a specific keyword (namely “tags”), 
#acts as taggable on allows you to specify an arbitrary number of tag “contexts” that can be used locally
#or in combination in the same way steroids was used.
gem 'acts-as-taggable-on', '~> 2.3.1'

#Queue 
gem 'amqp'


#Background Job
gem 'redis'
gem 'sidekiq'

#mongo db
gem "mongoid", "~> 3.0.0"
#postgres
gem 'pg'

group :development,:test  do
  gem 'rspec-rails'
  gem "mongoid-rspec", "~> 1.5.4"
end
