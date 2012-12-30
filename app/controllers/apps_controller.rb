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
  ##             "time"=>"2012-10-09T12:10:24Z",
  ##
  ##            "description"=>{"email"=>"john.doe@example.com", "customer"=>{"address"=>{"city"=>"Bangalore"}}, "origin"=>"http://example.com"}, 
  ##
  ##            "schema" => {
  ##                             properties: {
  ##                                           'customer[email]' => {  
  ##                                                                   "total"=>5, 
  ##                                                                   "types" => { 
  ##                                                                                "String" => {"total" => 3, "events" => {"set_actor" => 2, "sign_up" => 1}},
  ##                                                                                "Number" => {"total" => 2, "events" => {"purchased" => 1, "sign_up" => 1}}
  ##                                                                              }
  ##                                                                }
  ##                                         }
  ##                           
  ##                             events:     {
  ##                                           'sign_up' => {"name" => String, "address[city]" => "String"}
  ##                                         }
  ##                             
  ##                             profile:    {
  ##                                           "customer[address][city]"=>  {"total"=>1, "types"=>{"String"=>1}}, 
  ##                                           "email"=>                    {"total"=>1, "types"=>{"String"=>1}}
  ##                                         }  
  ##                             system:     {
  ##                                           "os"=>        {"total"=>2, "types"=>{"String"=>1, "Number"=>1}}, 
  ##                                           "browser"=>   {"total"=>2, "types"=>{"String"=>2}}}
  ##                                         }  
  ##                        }  
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

    params[:account_id] = current_account._id.to_s 
    params[:method] = "create"
    
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

    params[:account_id] = current_account._id.to_s 
    params[:method] = "delete"
    
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
  ##					  "id"=>"5074143063fe853420000005", 
  ##
  ##						"account_id"=>"5074143063fe853420000001", 
  ##
  ##            "description"=>{"email"=>"john.doe@example.com", "customer"=>{"address"=>{"city"=>"Bangalore"}}, "origin"=>"http://example.com"}, 
  ##
  ##            "schema" => {
  ##                             properties: {
  ##                                           'customer[email]' => {  
  ##                                                                   "total"=>5, 
  ##                                                                   "types" => { 
  ##                                                                                "String" => {"total" => 3, "events" => {"set_actor" => 2, "sign_up" => 1}},
  ##                                                                                "Number" => {"total" => 2, "events" => {"purchased" => 1, "sign_up" => 1}}
  ##                                                                              }
  ##                                                                }
  ##                                         }
  ##                           
  ##                             events:     {
  ##                                           'sign_up' => {"name" => String, "address[city]" => "String"}
  ##                                         }
  ##                             
  ##                             profile:    {
  ##                                           "customer[address][city]"=>  {"total"=>1, "types"=>{"String"=>1}}, 
  ##                                           "email"=>                    {"total"=>1, "types"=>{"String"=>1}}
  ##                                         }  
  ##                             system:     {
  ##                                           "os"=>        {"total"=>2, "types"=>{"String"=>1, "Number"=>1}}, 
  ##                                           "browser"=>   {"total"=>2, "types"=>{"String"=>2}}}
  ##                                         }  
  ##                        }  
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
  ##            "time"=>"2012-10-09T12:10:24Z",
  ##         }
  ##[async call]
  ##        {status: true}
	def update
		Rails.logger.info("Enter App Update")
		
		ret = {:return => {status: true}, :error => nil}

    params[:account_id] = current_account._id.to_s 
    params[:method] = "update"
    
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
  ##            account: {id: "445654654645"},
  ##
  ##            app: {
  ##                   id: "4545554654645", 
  ##                   description: {"super_app_id": "23131313", "name": "my app", "origin": "http://myapp.com"}, 
  ##                   schema: {
  ##                             properties: {
  ##                                           'customer[email]' => {  
  ##                                                                   "total"=>5, 
  ##                                                                   "types" => { 
  ##                                                                                "String" => {"total" => 3, "events" => {"set_actor" => 2, "sign_up" => 1}},
  ##                                                                                "Number" => {"total" => 2, "events" => {"purchased" => 1, "sign_up" => 1}}
  ##                                                                              }
  ##                                                                }
  ##                                         }
  ##                           
  ##                             events:     {
  ##                                           'sign_up' => {"name" => String, "address[city]" => "String"}
  ##                                         }
  ##                             
  ##                             profile:    {
  ##                                           "customer[address][city]"=>  {"total"=>1, "types"=>{"String"=>1}}, 
  ##                                           "email"=>                    {"total"=>1, "types"=>{"String"=>1}}
  ##                                         }  
  ##                             system:     {
  ##                                           "os"=>        {"total"=>2, "types"=>{"String"=>1, "Number"=>1}}, 
  ##                                           "browser"=>   {"total"=>2, "types"=>{"String"=>2}}}
  ##                                         }  
  ##                           },
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
  ##                   time: 2009-02-19 21:00:00 UTC   
  ##                 }           
  ##            
  ##           events: [
  ##                      {
  ##                        id: "3232342434", name: "sign_in", 
  ##                        properties: [{"k" => "name", "v" => "alok"}, {"k" => "address[city]", "v" => "Bangalore"}]
  ##                        actor_id: "3433434",
  ##                        time: 2009-02-19 00:00:00 UTC
  ##                      },
  ##                      {..}
  ##                    ],
  ##          conversions: [
  ##                            {
  ##                              id: "32323424355",
  ##                              properties: [{"k" => "button", "v" => "clicked"}, {"k" => "times", "v" => "40"}]
  ##                              actor_id: "3433434",
  ##                              time: 2009-02-19 23:00:00 UTC
  ##                            },
  ##                            {...}
  ##                       ],
  ##          errors: [
  ##                       {
  ##                          id: "3232342434",
  ##                          properties: [{"k" => "name", "v" => "Javascript Error"}, {"k" => "reason", "v" => "dont know"}]
  ##                          actor_id: "3433434",
  ##                          time: 2009-02-19 21:00:00 UTC
  ##                       },
  ##                       {...}
  ##                 ],
  ##          actors: [
  ##                      {
  ##                        id: "3433434", 
  ##                        description:  { profile: {  "name": ["John Doe"],   "email": ["john@doe.com"] }, system: {os: ["win", "mac"]}},
  ##                        time: 2009-02-19 21:00:00 UTC
  ##                      }
  ##                      {..}
  ##                  ]
  ##        }
  ##[async call]
  ##        {status: true}
	def read
		Rails.logger.info("Enter App read")

		ret = {:return => {status: true}, :error => nil}

    params[:account_id] = current_account._id.to_s 
    params[:method] = "read"
    
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
end
