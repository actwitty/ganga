require 'utility'

class AppsController < ApplicationController
	
  protect_from_forgery
  before_filter :authenticate_account!

  respond_to  :json
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
		
    # Create Anonymous actor
    params[:account_id] = current_account._id if Rails.env != "test"

		ret = App.add!(params)
    
    raise ret[:error] if !ret[:error].blank?

 		hash = ret[:return].attributes
		hash["id"] = hash["_id"]
		hash.delete("_id")

	  respond_with(hash, status: 200, :location => "nil")			
	rescue => e
		Rails.logger.error("**** ERROR **** #{er(e)}")
		respond_with({ errors: e.message} , status: 422, :location => "nil")
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

    # Create Anonymous actor
    params[:account_id] = current_account._id if Rails.env != "test"

		App.where(account_id: params[:account_id] , _id: params[:app_id]).destroy

		respond_with({status: true}, status: 200, :location => "nil")			
	rescue => e
		Rails.logger.error("**** ERROR **** #{er(e)}")
		respond_with({ errors:  e.message}, status: 422, :location => "nil")
	end


	# Function
  
  # NOTE
  ## update app description

  # INPUT
  ## {
  ##  :app_id => "1234444',    [MANDATORY]
  ##  :description => {        [MANDATORY]
  ##      "email" => "john.doe@example.com",
  ##      "address" => {:city => "Bangalore"}}
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
		
		params[:account_id] = current_account._id if Rails.env != "test"
		ret = App.update(params)

		raise ret[:error] if !ret[:error].blank?

		hash = ret[:return].attributes
		hash["id"] = hash["_id"]
		hash.delete("_id")

		respond_with(hash, status: 200, :location => "nil")		
	rescue => e
		Rails.logger.error("**** ERROR **** #{er(e)}")
		respond_with({ errors: e.message}, status: 422, :location => "nil")
	end	


	# NOTE
  ## Read App

  # INPUT
  ## {  
  ##  	:app_id => 123                   [MANDATORY]
  ##    :events => true or false         [OPTIONAL] # events 
  ##    :actors => true or false         [OPTIONAL] # actors
  ## }

  # OUTPUT =>{ 
  ##            account: {id: "445654654645"},
  ##
  ##            app: {
  ##                   id: "4545554654645", 
  ##                   description: {"super_app_id": "23131313", "name": "my app", "domain": "http://myapp.com"}, 
  ##                   rules: [
  ##                             {
  ##                               "name"=>"A fancy rule", "event"=>"singup", "owner"=>"client", "action"=>"topbar",
  ##                               "action_param"=>{"text"=>"A quickbrown fox jumps over a lazy dog", "href"=>"http://www.google.com", "color"=>"#333333", "width"=>"50"}, 
  ##                               "conditions"=>[{"property"=>"person[email]", "negation"=>"true", "operation"=>"ew", "value1"=>"@gmail.com", "connect"=>"and"}], 
  ##                               "updated_at"=>2012-10-24 07:43:38 UTC, 
  ##                               "created_at"=>2012-10-24 07:43:38 UTC, "id"=>"50879c2a63fe855d14000005"
  ##                             },
  ##                             {..}
  ##                           ],
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
  ##                             profile:{
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
  ##                    ] ,
  ##           actors: [
  ##                      {id: "3433434", description:  { profile: {  "name": ["John Doe"],   "email": ["john@doe.com"] }, system: {os: ["win", "mac"]}}}
  ##                      {..}
  ##                   ]
  ##        }
	def read
		Rails.logger.info("Enter App read")

		params[:account_id] = current_account._id if Rails.env != "test"
		ret = App.read(params)
		
		raise ret[:error] if !ret[:error].blank?

		respond_with(ret[:return], status: 200)			
	rescue => e
		Rails.logger.error("**** ERROR **** #{er(e)}")
		respond_with( { errors: e.message}, status: 422)
	end
end
