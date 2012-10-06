require 'utility'

class AppsController < ApplicationController
	before_filter :authenticate_account!
	protect_from_forgery

  # NOTE
  ## Create App

  # INPUT
  ## {  
  ##  	:description => {							[MANDATORY]
  ##  		:email => "john.doe@example.com",
  ##        :address => {:city => "Bangalore"}}
  ## }

  # OUTPUT => {object json}
	def create
		Rails.logger.info("Enter App Create")

		if params[:description].blank?
			raise et("app.invalid_argument_in_create") 
		end
	
		obj = App.create!(account_id: current_account._id, description: params[:description])

		render json: {object: obj}, status: 200			
	rescue => e
		Rails.logger.error("**** ERROR **** #{e.message}")
		render json: { errors: e , status: 422}
	end


	# NOTE
  ## Delete App

  # INPUT
  ## {  
  ##  	:app_id => 123                [MANDATORY]
  ## }

  # OUTPUT => {status; true or false}
	def delete
		Rails.logger.info("Enter App Delete")
		
		if params[:app_id].blank?
			raise et("app.invalid_argument_in_delete") 
		end

		App.where(_id: params[:app_id], account_id: current_account._id).destroy

		render json: {status: true}, status: 200			
	rescue => e
		Rails.logger.error("**** ERROR **** #{e.message}")
		render json: { errors:  e, status: 422}
	end


	# Function
  
  # NOTE
  ## update app description

  # INPUT
  ## {
  ##  :app_id => "1234444',    [MANDATORY]
  ##  :description => {        [MANDATORY]
  ##      :email => "john.doe@example.com",
  ##      :address => {:city => "Bangalore"}}
  ## }

  # OUTPUT => {:return => true, :error => nil}
	def update
		Rails.logger.info("Enter App Update")
		
		params[:account_id] = current_account._id
		ret = App.update(params)

		raise ret[:error] if !ret[:error].blank?

		render json: {object: ret[:return]}, status: 200			
	rescue => e
		Rails.logger.error("**** ERROR **** #{er(e)}")
		render json: { errors: e, status: 422}
	end	


	# NOTE
  ## Read App

  # INPUT
  ## {  
  ##  	:app_id => 123                [MANDATORY]
  ## }

  # OUTPUT => {object json}
	def read
		Rails.logger.info("Enter App read")

		if  params[:app_id].blank?
			raise et("app.invalid_argument_in_read") 
		end
		
		obj = App.where(_id: params[:app_id], account_id: current_account._id).first

		render json: {object: obj}, status: 200			
	rescue => e
		Rails.logger.error("**** ERROR **** #{e.message}")
		render json: { errors: e, status: 422}
	end
end
