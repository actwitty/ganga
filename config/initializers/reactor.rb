require "eventmachine"

#Thread.abort_on_exception=true
def start_reactor
  Rails.logger.info("Reactor running")
  if !EventMachine.reactor_running?
    Thread.new do
      EventMachine.run {
      	#Rails.logger.flush
      }
    end
  end
end

#start_reactor
