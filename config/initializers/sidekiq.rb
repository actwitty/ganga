Sidekiq.configure_server do |config|
  config.redis = { :url => AppConstants.redis_server, :namespace => 'rulebot' }
  config.server_middleware do |chain|
    chain.add Kiqstand::Middleware
  end
end

Sidekiq.configure_client do |config|
  config.redis = { :url => AppConstants.redis_server, :namespace => 'rulebot', :size => Sidekiq.options[:concurrency] + 2 }
end