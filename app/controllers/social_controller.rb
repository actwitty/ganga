class SocialController < ApplicationController
	
    protect_from_forgery
    def index
    end
	# API for checking  social CRM module (simple page for input/output)
	def social_crm
		Rails.logger.debug("#{__FILE__}:#{__method__}: Enter: URL#{request.env['PATH_INFO']} params:#{params}")
		Rails.logger.debug("entered twitter handles, player:#{params['owner']}, customer:#{params['customer']}")

 		if request.xhr?
        	render :json => {}, :status => 200
      	end  
	end

end
