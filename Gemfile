source 'http://rubygems.org'
ruby "2.0.0"

gem 'rails', '3.2.13'

gem 'heroku'

gem 'rb-readline', '~> 0.4.2'

# Gems used only for assets and not required
# in production environments by default.
group :assets do
  gem "bootstrap-sass", "~> 2.3.0.1"
  gem 'sass-rails',   '~> 3.2.3'
  gem 'coffee-rails', '~> 3.2.1'

  gem 'less-rails'

  # See https://github.com/sstephenson/execjs#readme for more supported runtimes
  gem 'therubyracer'

  gem 'uglifier'
end

# Add Jquery source gems for asset pipline
gem 'jquery-rails', "2.1.4"
gem 'jquery-ui-rails'
gem 'twitter-bootstrap-rails', :git => 'git://github.com/seyhunak/twitter-bootstrap-rails.git', :branch => 'static'
gem 'fancybox-rails'
gem "select2-rails"
gem 'jquery-datatables-rails'
gem 'bootstrap-colorpicker-rails'
gem 'bootstrap-datepicker-rails'
gem 'handlebars-source', '1.0.0.rc4' # or the version you need
gem 'ember-rails',  "0.8.0"
gem 'font-awesome-rails'
gem 'less-rails-bootstrap'
gem 'google-code-prettify-rails'


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
gem 'faraday'
gem 'faraday_middleware'
#gem 'faraday_middleware-parse_oj' #to register Oj json parser in faraday middleware

#for asynchronous web-socket
gem 'em-http-request'
gem 'em-synchrony'


#thin Webserver
gem 'puma'

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
#gem 'amqp'
gem 'pusher'

# memcache
gem 'dalli'


#Background Job
gem 'redis'
gem 'sidekiq'
gem 'kiqstand'

#mongo db
gem "mongoid"

gem 'colorize'

gem 'yajl-ruby'

# domain parser
gem 'domainatrix'

# for v8 update
#gem 'therubyracer'

# deployment capistrano 
gem 'capistrano'

group :test, :development  do
  gem 'rspec-rails'
  gem 'factory_girl_rails'

end

group :test  do
  gem "mongoid-rspec", "~> 1.5.4"
  gem 'spork-rails'
  gem 'database_cleaner'
  gem 'ruby-prof'
  # gem 'capybara'
  # gem 'capybara-webkit'
  # gem 'capybara-json'
end
