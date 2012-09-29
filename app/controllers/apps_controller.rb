require 'utility'

class AppsController < ApplicationController
	before_filter :authenticate_account!
	protect_from_forgery

	def create
		Rails.logger.info("Enter App Create")
	
		@app = App.new(account_id: params[:account_id], description: params[:description])
		@app.save!

		render json: @app, status: 200			
	rescue => e
		Rails.logger.error("**** ERROR **** #{e.message}")
		render json: { errors: e , status: 422}
	end

	def delete
		Rails.logger.info("Enter App Delete")
	
		@app = App.find(params[:id]).destroy

		render json: {status: true}, status: 200			
	rescue => e
		Rails.logger.error("**** ERROR **** #{e.message}")
		render json: { errors:  e, status: 422}
	end

	def update
		Rails.logger.info("Enter App Update")
	
		@app = App.find(params[:id]).update(description: params[:description])

		render json: @app, status: 200			
	rescue => e
		Rails.logger.error("**** ERROR **** #{e.message}")
		render json: { errors: e, status: 422}
	end	

	def read
		Rails.logger.info("Enter App read")
	
		@app = App.find(params[:id])

		render json: @app, status: 200			
	rescue => e
		Rails.logger.error("**** ERROR **** #{e.message}")
		render json: { errors: e, status: 422}
	end
end
