server  "172.18.100.199", :web, :app, :db
set :user, "alok"

default_run_options[:pty] = true

set :recipient, "Ruby"

task :development, roles: :db do
  puts "Development #{recipient}"
  run "#{sudo} cp ~/hello.txt /hello"
end

task :testing, roles: :web do
  puts "Test #{recipient}"
end

task :staging do
  puts "Staging #{recipient}"
end

task :production, roles: :app do
  puts "Production #{recipient}"
end
after :development, :testing,  :staging, :production