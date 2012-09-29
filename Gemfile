source 'http://rubygems.org'
ruby "1.9.3"

gem 'rails', '3.2.8'

gem 'heroku'

# Gems used only for assets and not required
# in production environments by default.
group :assets do
  gem "bootstrap-sass", "~> 2.0.4.0"
  gem 'sass-rails',   '~> 3.2.3'
  gem 'coffee-rails', '~> 3.2.1'
  gem 'less-rails'

  # See https://github.com/sstephenson/execjs#readme for more supported runtimes
  # gem 'therubyracer'

  gem 'uglifier', '>= 1.0.3'
end

# Add Jquery source gems for asset pipline
gem 'jquery-rails', "1.0.19"
gem 'handlebars_assets'
gem 'ember-rails', :git => 'git://github.com/emberjs/ember-rails.git'
gem 'ember-rest-rails'
gem 'twitter-bootstrap-rails'
gem 'less-rails-bootstrap'

#algorithms
gem 'algorithms'

#Mailchimp
gem "hominid"

#Authentication
gem 'devise'
gem "devise_invitable"

#JSON and API
# gem 'oj' #fast json parser
# gem 'acts_as_api'

#Parsers
# gem 'nokogiri'


#Manages constants
gem 'app_constants'


#for http client Adaptor 
#gem 'faraday'
#gem 'faraday_middleware'
#gem 'faraday_middleware-parse_oj' #to register Oj json parser in faraday middleware

#for asynchronous web-socket
#gem 'em-http-request'
#gem 'em-synchrony'


#thin Webserver
gem 'thin'

#haml
gem 'haml-rails'

#to enable detect mobile devices that access  Rails application
# gem 'mobile-fu'


#For instance, in a social network, a user might have tags that are called skills, interests, sports, and more. 
#There is no real way to differentiate between tags and so an implementation of this type is not possible with acts as taggable on steroids.
#Rather than tying functionality to a specific keyword (namely “tags”), 
#acts as taggable on allows you to specify an arbitrary number of tag “contexts” that can be used locally
#or in combination in the same way steroids was used.
# gem 'acts-as-taggable-on', '~> 2.3.1'

#Queue 
gem 'amqp'


#Background Job
gem 'redis'
gem 'sidekiq'

#mongo db
gem "mongoid", "~> 3.0.0"


group :test, :development  do
  gem 'rspec-rails'
  gem 'factory_girl_rails'
end

group :test  do
  gem "mongoid-rspec", "~> 1.5.4"
  gem 'spork-rails'
  gem 'database_cleaner'
  gem 'rspec-mocks'
end
