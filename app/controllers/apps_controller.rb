require 'utility'

class AppsController < ApplicationController
	
  protect_from_forgery

  authenticate_request( origin: { only: ["read"] } ) 

  respond_to  :json
  # NOTE
  ## Create App

  # INPUT
  ## {  
  ##  	:description => {							        [MANDATORY]
  ##      :name => "App Name 1"               [MANDATORY] # must be unique in account
  ##      :origin => "http://www.trigmatic.com" [OPTIONAL]  # can be used from API
  ##      :email => "john.doe@example.com",
  ##      :address => {:city => "Bangalore"}
  ##    }
  ## }

  # OUTPUT => 
  ##[sync call]
  ##          {
  ##					  "id"=>"5074143063fe853420000005", 
  ##
  ##						"account_id"=>"5074143063fe853420000001", 
  ##
  ##            "time"=>"2012-10-09T12:10:24Z",
  ##
  ##            "description"=>{"email"=>"john.doe@example.com", "customer"=>{"address"=>{"city"=>"Bangalore"}}, "origin"=>"http://example.com"}, 
  ##
  ##            "schema"=>  {
  ##                         
  ##                          events: {
  ##                                    'sign_up' => {"name" => String, "address[city]" => "String", "$l" => "String"}
  ##                                  }
  ##                             
  ##                        }, 
  ##            "rules" => [
  ##                              {
  ##                                "name"=>"A fancy rule", "event"=>"singup", "owner"=>"client", "action"=>"topbar",
  ##                                "action_param"=>{"text"=>"A quickbrown fox jumps over a lazy dog", "href"=>"http://www.google.com", "color"=>"#333333", "width"=>"50"}, 
  ##                                "conditions"=>[{"property"=>"person[email]", "negation"=>"true", "operation"=>"ew", "value1"=>"@gmail.com", "connect"=>"and"}], 
  ##                                "updated_at"=>2012-10-24 07:43:38 UTC, 
  ##                                "created_at"=>2012-10-24 07:43:38 UTC, "id"=>"50879c2a63fe855d14000005"
  ##                              },
  ##                              {..}
  ##                      ],   
  ##         }
  ##[async call]
  ##        {status: true}
	def create
		Rails.logger.info("Enter App Create")
	
    ret = {:return => {status: true}, :error => nil}

    if params[:sync]
      ret = AppsWorker.create(params)
    else
      AppsWorker.perform_async(params)
    end  
    
    raise ret[:error] if !ret[:error].blank?

    respond_with( ret[:return], status: 200, location: "nil")
  rescue => e 
    Rails.logger.error("**** ERROR **** #{er(e)}")
    respond_with({ errors:  e.message}, status: 422, :location => "nil")
	end


	# NOTE
  ## Delete App

  # INPUT
  ## {  
  ##  	:id => 123                [MANDATORY]
  ## }

  # OUTPUT =>
  ##[sync call] 
  ##        {status; true or false}
  ##[async call]
  ##        {status: true}
	def delete
		Rails.logger.info("Enter App Delete")
		
		if params[:id].blank?
			raise et("app.invalid_argument_in_delete") 
		end

    ret = {:return => {status: true}, :error => nil}
    
    if params[:sync]
      ret = AppsWorker.delete(params)
    else
      AppsWorker.perform_async(params)
    end  
    
    raise ret[:error] if !ret[:error].blank?

    respond_with( ret[:return], status: 200, location: "nil")
  rescue => e 
    Rails.logger.error("**** ERROR **** #{er(e)}")
    respond_with({ errors:  e.message}, status: 422, :location => "nil")
	end


	# Function
  
  # NOTE
  ## update app description

  # INPUT
  ## {
  ##  :id => "1234444',        [MANDATORY]
  ##  :description => {        [MANDATORY]
  ##      "email" => "john.doe@example.com",
  ##      "address" => {:city => "Bangalore"}}
  ## }

  # OUTPUT => 
  ##[sync call]
  ##          {
  ##            "id"=>"5074143063fe853420000005", 
  ##
  ##            "account_id"=>"5074143063fe853420000001", 
  ##
  ##            "time"=>"2012-10-09T12:10:24Z",
  ##
  ##            "description"=>{"email"=>"john.doe@example.com", "customer"=>{"address"=>{"city"=>"Bangalore"}}, "origin"=>"http://example.com"}, 
  ##
  ##            "schema"=>  {
  ##                         
  ##                           events: {
  ##                                    'sign_up' => {"name" => String, "address[city]" => "String", "$l" => "String"}
  ##                                   }
  ##                             
  ##                        }, 
  ##            "sample_events" => {
  ##                                      'sign_up' => {"name" => "john", "address" => { "city" => "NY"}, "email" => "john@doe.com", $l" => "String"}
  ##                                      'purchased' => {"itme" => "ipod", "value" => 50 $" , "$l" => "Bangalore", "$b" => "chrome"}
  ##                               },
  ##            "rules" => [
  ##                              {
  ##                                "name"=>"A fancy rule", "event"=>"singup", "owner"=>"client", "action"=>"topbar",
  ##                                "action_param"=>{"text"=>"A quickbrown fox jumps over a lazy dog", "href"=>"http://www.google.com", "color"=>"#333333", "width"=>"50"}, 
  ##                                "conditions"=>[{"property"=>"person[email]", "negation"=>"true", "operation"=>"ew", "value1"=>"@gmail.com", "connect"=>"and"}], 
  ##                                "updated_at"=>2012-10-24 07:43:38 UTC, 
  ##                                "created_at"=>2012-10-24 07:43:38 UTC, "id"=>"50879c2a63fe855d14000005"
  ##                              },
  ##                              {..}
  ##                      ],   
  ##         }
  ##[async call]
  ##        {status: true}
	def update
		Rails.logger.info("Enter App Update")
		
		ret = {:return => {status: true}, :error => nil}
    
    if params[:sync]
      ret = AppsWorker.update(params)
    else
      AppsWorker.perform_async(params)
    end  
    
    raise ret[:error] if !ret[:error].blank?

    respond_with( ret[:return], status: 200, location: "nil")
  rescue => e 
    Rails.logger.error("**** ERROR **** #{er(e)}")
    respond_with({ errors:  e.message}, status: 422, :location => "nil")
	end	


	# NOTE
  ## Read App

  # INPUT
  ## {  
  ##  	id: 123                   [MANDATORY]
  ##    events: true or false         [OPTIONAL] # events 
  ##    conversions: true or false    [OPTIONAL] # conversion
  ##    errors: true or false         [OPTIONAL] # errors
  ##    actors: true or false         [OPTIONAL] # actors
  ## }

  # OUTPUT =>
  ##[sync call]
  ##          {
  ##            "id"=>"5074143063fe853420000005", 
  ##
  ##            "account_id"=>"5074143063fe853420000001", 
  ##
  ##            "time"=>"2012-10-09T12:10:24Z",
  ##
  ##            "description"=>{"email"=>"john.doe@example.com", "customer"=>{"address"=>{"city"=>"Bangalore"}}, "origin"=>"http://example.com"}, 
  ##
  ##            "schema"=>  {
  ##                         
  ##                          events: {
  ##                                    'sign_up' => {"name" => String, "address[city]" => "String", "$l" => "String"}
  ##                                  }
  ##                             
  ##                        }, 
  ##            "sample_events" => {
  ##                                      'sign_up' => {"name" => "john", "address" => { "city" => "NY"}, "email" => "john@doe.com", $l" => "String"}
  ##                                      'purchased' => {"itme" => "ipod", "value" => 50 $" , "$l" => "Bangalore", "$b" => "chrome"}
  ##                               },
  ##            "rules" => [
  ##                              {
  ##                                "name"=>"A fancy rule", "event"=>"singup", "owner"=>"client", "action"=>"topbar",
  ##                                "action_param"=>{"text"=>"A quickbrown fox jumps over a lazy dog", "href"=>"http://www.google.com", "color"=>"#333333", "width"=>"50"}, 
  ##                                "conditions"=>[{"property"=>"person[email]", "negation"=>"true", "operation"=>"ew", "value1"=>"@gmail.com", "connect"=>"and"}], 
  ##                                "updated_at"=>2012-10-24 07:43:38 UTC, 
  ##                                "created_at"=>2012-10-24 07:43:38 UTC, "id"=>"50879c2a63fe855d14000005"
  ##                              },
  ##                              {..}
  ##                      ],   
  ##         }
  ##[async call]
  ##        {status: true}
	def read
		Rails.logger.info("Enter App read")

		ret = {:return => {status: true}, :error => nil}
    
    if params[:sync]
      ret = AppsWorker.read(params)
    else
      AppsWorker.perform_async(params)
    end  
    
    raise ret[:error] if !ret[:error].blank?

    respond_with( ret[:return], status: 200)
  rescue => e 
    Rails.logger.error("**** ERROR **** #{er(e)}")
    respond_with({ errors:  e.message}, status: 422)
	end

  # NOTE
  ## Add a sample event

  # INPUT
  ## {
  ##  :id => "1234444',       [MANDATORY]
  ##  :name =>    "sign_up",  [MANDATORY] # event name is case sensitive
  ##  :properties => {        [MANDATORY]
  ##      :email => "john.doe@example.com",
  ##      :customer => {:address => {:city => "Bangalore"}},
  ##      :$l => "bangalore",
  ##      :$c => "india" 
  ##   }
  ## }

  # OUTPUT => 
  ##[sync call]
  ##          {:return => true, :error => nil}
  ##[async call]
  ##          {status: true}
  def add_sample_event
    Rails.logger.info("Enter Add Sample Event")
    
    ret = {:return => {status: true}, :error => nil}
    
    if params[:sync]
      ret = AppsWorker.add_sample_event(params)
    else
      AppsWorker.perform_async(params)
    end  
    
    raise ret[:error] if !ret[:error].blank?

    respond_with( ret[:return], status: 200, location: "nil")
  rescue => e 
    Rails.logger.error("**** ERROR **** #{er(e)}")
    respond_with({ errors:  e.message}, status: 422, :location => "nil")
  end

  # NOTE
  ## Delete a sample event

  # INPUT
  ## {
  ##  :id => "1234444',       [MANDATORY]
  ##  :name =>    "sign_up",  [MANDATORY] # event name is case sensitive
  ## }

  # OUTPUT => 
  ##[sync call]
  ##          {:return => true, :error => nil}
  ##[async call]
  ##          {status: true}
  def delete_sample_event
    Rails.logger.info("Enter Delete Sample Event")
    
    ret = {:return => {status: true}, :error => nil}
    
    if params[:sync]
      ret = AppsWorker.delete_sample_event(params)
    else
      AppsWorker.perform_async(params)
    end  
    
    raise ret[:error] if !ret[:error].blank?

    respond_with( ret[:return], status: 200, location: "nil")
  rescue => e 
    Rails.logger.error("**** ERROR **** #{er(e)}")
    respond_with({ errors:  e.message}, status: 422, :location => "nil")
  end 
end
