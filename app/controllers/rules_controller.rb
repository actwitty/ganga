class RulesController < ApplicationController
  protect_from_forgery

  authenticate_request

  respond_to :json

  # NOTE
  ## create a rule

  # INPUT
  ## {
  ##  :app_id => "1234444',   [MANDATORY]
  ##  :rule => {              [MANDATORY]
  ##              name: 'A fancy rule',
  ##              event: 'singup',
  ##              owner: 'client',
  ##              action: 'topbar',
  ##              action_param: {
  ##                              text: "A quickbrown fox jumps over a lazy dog",
  ##                              href: "http://www.google.com",
  ##                              color: "#333333",
  ##                              width: "50",
  ##                            },
  ##                  conditions: [
  ##                                {
  ##                                  property: 'person[email]',
  ##                                  negation: 'true',
  ##                                  operation: 'ew',
  ##                                  value1: '@gmail.com',
  ##                                  connect: 'and',
  ##                                },
  ##                                {
  ##                                  property: 'person[counter]',
  ##                                  negation: 'false',
  ##                                  operation: 'gt',
  ##                                  value1: 5,
  ##                                  connect: 'and',
  ##                                },
  ##                                {
  ##                                  property: 'person[counter]',
  ##                                  negation: 'false',
  ##                                  operation: 'gt',
  ##                                  value1: 5,
  ##                                }
  ##           }
  ##  }

  # OUTPUT => 
  ##[sync call]
  ##          {
  ##            rule_id: "1211221"
  ##          }
  ##[async call]
  ##          {status: true}
  def create
    Rails.logger.info("Enter Rule Update")

    ret = {:return => {status: true}, :error => nil}
    
    if params[:sync]
      ret = RulesWorker.create(params)
    else
      RulesWorker.perform_async(params)
    end  
    
    raise ret[:error] if !ret[:error].blank?

    respond_with( ret[:return], status: 200, location: "nil")
  rescue => e 
    Rails.logger.error("**** ERROR **** #{er(e)}")
    respond_with({ errors:  e.message}, status: 422, :location => "nil")
  end


  ## update a rule

  # INPUT
  ## {
  ##  :id => "234234234" [MANDATORY]
  ##  :app_id => "1234444',   [MANDATORY]
  ##  :rule => {              [MANDATORY]
  ##              name: 'A fancy rule',
  ##              event: 'singup',
  ##              owner: 'client',
  ##              action: 'topbar',
  ##              action_param: {
  ##                              text: "A quickbrown fox jumps over a lazy dog",
  ##                              href: "http://www.google.com",
  ##                              color: "#333333",
  ##                              width: "50",
  ##                            },
  ##                  conditions: [
  ##                                {
  ##                                  property: 'person[email]',
  ##                                  negation: 'true',
  ##                                  operation: 'ew',
  ##                                  value1: '@gmail.com',
  ##                                  connect: 'and',
  ##                                },
  ##                                {
  ##                                  property: 'person[counter]',
  ##                                  negation: 'false',
  ##                                  operation: 'gt',
  ##                                  value1: 5,
  ##                                  connect: 'and',
  ##                                },
  ##                                {
  ##                                  property: 'person[counter]',
  ##                                  negation: 'false',
  ##                                  operation: 'gt',
  ##                                  value1: 5,
  ##                                }
  ##           }
  ##  }

  # OUTPUT => 
  ##[sync call]
  ##          {
  ##            status: true or false
  ##          }
  ##[async call]
  ##          {status: true}
  def update
    Rails.logger.info("Enter Rule Update")

    ret = {:return => {status: true}, :error => nil}

    params[:method] = "update"
    
    if params[:sync]
      ret = RulesWorker.update(params)
    else
      RulesWorker.perform_async(params)
    end  
    
    raise ret[:error] if !ret[:error].blank?

    respond_with( ret[:return], status: 200, location: "nil")
  rescue => e 
    Rails.logger.error("**** ERROR **** #{er(e)}")
    respond_with({ errors:  e.message}, status: 422, :location => "nil")
  end


  ## read one or all rule

  # INPUT
  ## {
  ##  :app_id => "1234444',   [MANDATORY]
  ##
  ##  :id => "234234234"      [OPTIONAL] #read one rule
  ##                  OR
  ##  :event => "sign_up"     [OPTIONAL] #read all rules for this event
  ##                 
  ## }

  # OUTPUT => 
  ##[sync call]
  ##          rules: [ 
  ##                    {"name"=>"fancy rule 1", "event"=>"sign_up", "owner"=>"client", "action"=>"topbar", "action_param"=>{"text"=>"A quickbrown fox jumps over a lazy dog", "href"=>"http://www.google.com", "color"=>"#333333", "width"=>"50"}, "conditions"=>[{"property"=>"person[email]", "negation"=>"true", "operation"=>"ew", "value1"=>"@gmail.com", "connect"=>"and"}], "updated_at"=>"2012-11-01T09:39:42Z", "created_at"=>"2012-11-01T09:39:42Z", "id"=>"5092435e63fe855b28000005"},
  ##                    {"name"=>"fancy rule 2", "event"=>"sign_in", "owner"=>"client", "action"=>"topbar", "action_param"=>{"text"=>"A quickbrown fox jumps over a lazy dog", "href"=>"http://www.google.com", "color"=>"#333333", "width"=>"50"}, "conditions"=>["sadasdasdasd", "dsdasdasd"], "updated_at"=>"2012-11-01T09:39:42Z", "created_at"=>"2012-11-01T09:39:42Z", "id"=>"5092435e63fe855b28000006"}, 
  ##                    {"name"=>"fancy rule 3", "event"=>"sign_up", "owner"=>"client", "action"=>"topbar", "action_param"=>{"text"=>"A quickbrown fox jumps over a lazy dog", "href"=>"http://www.google.com", "color"=>"#333333", "width"=>"50"}, "conditions"=>[], "updated_at"=>"2012-11-01T09:39:42Z", "created_at"=>"2012-11-01T09:39:42Z", "id"=>"5092435e63fe855b28000007"}
  ##                 ], 
  ##
  ##[async call]
  ##          {status: true}            
  def read
    Rails.logger.info("Enter Rule read")

    ret = {:return => {status: true}, :error => nil}

    params[:method] = "read"
    
    if params[:sync]
      ret = RulesWorker.read(params)
    else
      RulesWorker.perform_async(params)
    end  
    
    raise ret[:error] if !ret[:error].blank?

    respond_with( ret[:return], status: 200)
  rescue => e 
    Rails.logger.error("**** ERROR **** #{er(e)}")
    respond_with({ errors:  e.message}, status: 422)
  end

  ## delete one or all rule

  # INPUT
  ## {
  ##  :app_id => "1234444',   [MANDATORY]
  ##
  ##  :id => "234234234" [OPTIONAL] #delete one rule
  ##                  OR
  ##  :event => "sign_up"     [OPTIONAL] #read all rules for this event
  ##                 
  ## }

  # OUTPUT => 
  ##[sync call]
  ##          {
  ##            : status => true or false
  ##          }
  ##[async call]
  ##          {status: true}
  def delete
    Rails.logger.info("Enter Rule Delete")

    ret = {:return => {status: true}, :error => nil}

    params[:method] = "delete"
    
    if params[:sync]
      ret = RulesWorker.delete(params)
    else
      RulesWorker.perform_async(params)
    end  
    
    raise ret[:error] if !ret[:error].blank?

    respond_with( ret[:return], status: 200, location: "nil")
  rescue => e 
    Rails.logger.error("**** ERROR **** #{er(e)}")
    respond_with({ errors:  e.message}, status: 422, :location => "nil")
  end
end
