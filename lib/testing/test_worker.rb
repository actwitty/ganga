module TestWorker
 class Worker

   #include perform_async as class method..
   #which in-turn pushes self on redis..
   #which in-turn calls perform
   include Sidekiq::Worker

   def perform(name, count)
     puts 'Doing hard work'
   end

 end
end