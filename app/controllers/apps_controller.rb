class AppsController < ApplicationController
	before_filter :authenticate_account!
	protect_from_forgery

	def create
		Rails.logger.info("")
	end
end
