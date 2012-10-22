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

  # OUTPUT => {
  ##					  "id"=>"5074143063fe853420000005", 
  ##
  ##						"account_id"=>"5074143063fe853420000001", 
  ##
  ##            "created_at"=>"2012-10-09T12:10:24Z", "updated_at"=>"2012-10-09T12:10:24Z",
  ##
  ##            "description"=>{"email"=>"john.doe@example.com", "customer"=>{"address"=>{"city"=>"Bangalore"}}, "domain"=>"http://example.com"}, 
  ##
  ##            "schema"=>{ ## EXAMPLE
  ##                        properties: {
  ##        															'customer[email]' => { 
  ##                                															"String" => ["set_actor", "sign_up"] ,
  ##                                															"Fixnum" => ["purchased", "sign_in"] 
  ##                             															 }
  ##      															}
  ##      									events: {
  ##        															'sign_up' => {"name" => String, "address[city]" => "String"}
  ##      													} 
  ##          						}
  ##         }
	def create
		Rails.logger.info("Enter App Create")

		if params[:description].blank?
			raise et("app.invalid_argument_in_create") 
		end
	
		obj = App.create!(account_id: current_account._id, description: params[:description])

		hash = obj.attributes
		hash["id"] = hash["_id"]
		hash.delete("_id")
    
	  render json: hash, status: 200			
	rescue => e
		Rails.logger.error("**** ERROR **** #{er(e)}")
		render json: { errors: e.message} , status: 422
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

		App.where(account_id: current_account._id , _id: params[:app_id]).destroy

		render json: {status: true}, status: 200			
	rescue => e
		Rails.logger.error("**** ERROR **** #{er(e)}")
		render json: { errors:  e.message}, status: 422
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

  # OUTPUT => {
  ##					  "_id"=>"5074143063fe853420000005", 
  ##
  ##						"account_id"=>"5074143063fe853420000001", 
  ##
  ##            "created_at"=>"2012-10-09T12:10:24Z", "updated_at"=>"2012-10-09T12:10:24Z",
  ##
  ##            "description"=>{"email"=>"john.doe@example.com", "customer"=>{"address"=>{"city"=>"Bangalore"}}, "domain"=>"http://example.com"}, 
  ##
  ##            "schema"=>{ ## EXAMPLE
  ##                        properties: {
  ##        															'customer[email]' => { 
  ##                                															"String" => ["set_actor", "sign_up"], 
  ##                                															"Fixnum" => ["purchased", "sign_in"] 
  ##                             															 }
  ##      															}
  ##      									events: {
  ##        															'sign_up' => {"name" => String, "address[city]" => "String"}
  ##      													} 
  ##          						}
  ##         }
	def update
		Rails.logger.info("Enter App Update #{params.inspect}")
		
		params[:account_id] = current_account._id
		ret = App.update(params)

		raise ret[:error] if !ret[:error].blank?

		hash = ret[:return].attributes
		hash["id"] = hash["_id"]
		hash.delete("_id")

		render json: hash, status: 200			
	rescue => e
		Rails.logger.error("**** ERROR **** #{er(e)}")
		render json: { errors: e.message}, status: 422
	end	


	# NOTE
  ## Read App

  # INPUT
  ## {  
  ##  	:app_id => 123      [MANDATORY]
  ##    :events => true or false         [OPTIONAL] # events 
  ## }

  # OUTPUT =>{ 
  ##            account: {id: "445654654645"},
  ##
  ##            app: {
  ##                   id: "4545554654645", 
  ##                   description: {"name": "my app", "domain": "http://myapp.com"}, 
  ##                   schema: {
  ##                             properties: {
  ##                                           'customer[email]' => { 
  ##                                                                   "String" => ["set_actor", "sign_up"],
  ##                                                                   "Fixnum" => ["purchased", "sign_in"]
  ##                                         }
  ##                           
  ##                             events: {
  ##                                           'sign_up' => {"name" => String, "address[city]" => "String"}
  ##                                     }
  ##                             
  ##                             actor:  {
  ##                                         "gender" => String, "name" => "String"
  ##                                     }  
  ##                             system: {
  ##                                         "location" => String, "page_view_time" => "String"
  ##                                     }  
  ##                           } 
  ##                 }  
  ##
  ##            events: [
  ##                      {
  ##                        actor: {id: "3433434", description:  { profile: {  "name": ["John Doe"],   "email": ["john@doe.com"] }, system: {os: ["win", "mac"]}} }
  ##          
  ##                        name: "sign_in", 
  ##                        properties: [{"k" => "name", "v" => "alok"}, {"k" => "address[city]", "v" => "Bangalore"}]
  ##                        time: 2009-02-19 00:00:00 UTC
  ##                      },
  ##                      {..}
  ##                    ]
  ##        }
	def read
		Rails.logger.info("Enter App read")

		params[:account_id] = current_account._id
		ret = App.read(params)
		
		raise ret[:error] if !ret[:error].blank?

		render json: ret[:return], status: 200			
	rescue => e
		Rails.logger.error("**** ERROR **** #{er(e)}")
		render json: { errors: e.message}, status: 422
	end
end
