module Authenticate
	class Acc
	  # this is called from the controller automatically when we use before_filter
	  def before( controller )
	    Rails.logger.info("Authenticate Account before filter called")
	    controller.authenticate_account!

	    # dont enable for api or cross-origin Request
	    # in those request we build session.. so need to check if @tear_down is set 
	    # to saparate from normal session from fake session
	    if controller.instance_variable_get(:@tear_down).blank?
        controller.make_sync_request
      end
	  end
	end
end