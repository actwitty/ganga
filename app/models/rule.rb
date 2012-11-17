class Rule
  include Mongoid::Document
  include Mongoid::Timestamps

  # Trigger => Filters => Actions

  # Relations
  embedded_in :app
  
  # Attributes

  # Functions

  ## create a rule

  # INPUT
  ## {
  ##  :account_id => "121212" [MANDATORY]
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

  # OUTPUT => {
  ##            rule_id: "1211221"
  ##          }
  def self.add!(params)
  	Rails.logger.info("Enter Rule Add")

  	if params[:account_id].blank? or params[:app_id].blank? or params[:rule].blank?
  		raise et("rule.invalid_argument_in_create") 
  	end

    app = App.where(account_id: params[:account_id], _id: params[:app_id] ).first
    raise et("rule.invalid_app_id", id: params[:app_id]) if app.blank?
    
    rule = app.rules.create!(params[:rule])

  	{:return => rule._id, :error => nil}
  rescue => e
    Rails.logger.error("**** ERROR **** #{er(e)}")
    {:return => nil, :error => e}
  end




  ## update a rule

  # INPUT
  ## {
  ##  :id =>       "234234234" [MANDATORY]
  ##  :account_id => "121212" [MANDATORY]
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

  # OUTPUT => {
  ##            :return => true, :error => nil
  ##          }
  def self.update(params)
    Rails.logger.info("Enter Rule Update")

    if params[:account_id].blank? or params[:app_id].blank? or params[:id].blank? or params[:rule].blank?
      raise et("rule.invalid_argument_in_update") 
    end

    app = App.where(account_id: params[:account_id], _id: params[:app_id] ).first
    raise et("rule.invalid_app_id", id: params[:app_id]) if app.blank?
    
    rule = app.rules.where(_id: params[:id]).first
    raise et("rule.invalid_rule_id") if rule.blank?

    rule.update_attributes(params[:rule])

    {:return => true, :error => nil}
  rescue => e
    Rails.logger.error("**** ERROR **** #{er(e)}")
    {:return => nil, :error => e}
  end

  ## read one or all rule

  # INPUT
  ## {
  ##  :account_id => "121212" [MANDATORY]
  ##  :app_id => "1234444',   [MANDATORY]
  ##
  ##  :id => "234234234"      [OPTIONAL] #read one rule
  ##                  OR
  ##  :event => "sign_up"     [OPTIONAL] #read all rules for this event
  ##                 
  ## }

  # OUTPUT => {
  ##            :return => [ 
  ##                         {"name"=>"fancy rule 1", "event"=>"sign_up", "owner"=>"client", "action"=>"topbar", "action_param"=>{"text"=>"A quickbrown fox jumps over a lazy dog", "href"=>"http://www.google.com", "color"=>"#333333", "width"=>"50"}, "conditions"=>[{"property"=>"person[email]", "negation"=>"true", "operation"=>"ew", "value1"=>"@gmail.com", "connect"=>"and"}], "updated_at"=>"2012-11-01T09:39:42Z", "created_at"=>"2012-11-01T09:39:42Z", "id"=>"5092435e63fe855b28000005"},
  ##                         {"name"=>"fancy rule 2", "event"=>"sign_in", "owner"=>"client", "action"=>"topbar", "action_param"=>{"text"=>"A quickbrown fox jumps over a lazy dog", "href"=>"http://www.google.com", "color"=>"#333333", "width"=>"50"}, "conditions"=>["sadasdasdasd", "dsdasdasd"], "updated_at"=>"2012-11-01T09:39:42Z", "created_at"=>"2012-11-01T09:39:42Z", "id"=>"5092435e63fe855b28000006"}, 
  ##                         {"name"=>"fancy rule 3", "event"=>"sign_up", "owner"=>"client", "action"=>"topbar", "action_param"=>{"text"=>"A quickbrown fox jumps over a lazy dog", "href"=>"http://www.google.com", "color"=>"#333333", "width"=>"50"}, "conditions"=>[], "updated_at"=>"2012-11-01T09:39:42Z", "created_at"=>"2012-11-01T09:39:42Z", "id"=>"5092435e63fe855b28000007"}
  ##                       ], 
  ##            :error => nil
  ##          }
  def self.read(params)
    Rails.logger.info("Enter Rule Read")

    array = []

    if params[:account_id].blank? or params[:app_id].blank? 
      raise et("rule.invalid_argument_in_read") 
    end

    app = App.where(account_id: params[:account_id], _id: params[:app_id] ).first
    raise et("rule.invalid_app_id", id: params[:app_id]) if app.blank?

    # one rule with _id params[:rule_id]
    if !params[:id].blank?
      rule = app.rules.where(_id: params[:id]).first
      raise et("rule.invalid_rule_id") if rule.blank?

      array << rule.format_rule
    
    # rules for an event
    elsif !params[:event].blank?
      app.rules.where(event: params[:event]).all.each do |rule|
        array << rule.format_rule
      end

    # all rules of app
    else
      app.rules.all.each do |rule|
        array << rule.format_rule
      end
    end
    {:return => array, :error => nil}
  rescue => e
    Rails.logger.error("**** ERROR **** #{er(e)}")
    {:return => [], :error => e}
  end

  ## delete one or all rule

  # INPUT
  ## {
  ##  :account_id => "121212" [MANDATORY]
  ##  :app_id => "1234444',   [MANDATORY]
  ##
  ##  :id => "234234234" [OPTIONAL] #read one rule
  ##                  OR
  ##  :event => "sign_up"     [OPTIONAL] #read all rules for this event
  ##                 
  ## }

  # OUTPUT => {
  ##            :return => true or false, :error => nil
  ##          }
  def self.delete(params)
    Rails.logger.info("Enter Rule Delete")

    if params[:account_id].blank? or params[:app_id].blank? 
      raise et("rule.invalid_argument_in_delete") 
    end

    app = App.where(account_id: params[:account_id], _id: params[:app_id] ).first
    raise et("rule.invalid_app_id", id: params[:app_id]) if app.blank?

    # destroy one rule with _id params[:rule_id]
    if !params[:id].blank?
      rule = app.rules.where(_id: params[:id]).destroy_all
    
    # destroy rules for an event
    elsif !params[:event].blank?
      app.rules.where(event: params[:event]).destroy_all

    # destroy all rules of app
    else
      app.rules.destroy_all
    end

    {:return => true, :error => nil}
  rescue => e
    Rails.logger.error("**** ERROR **** #{er(e)}")
    {:return => false, :error => e}

  end

  def format_rule
    hash = self.attributes
    hash["id"] = hash["_id"].to_s
    hash["time"] = hash["updated_at"]
    hash = hash.except("_id", "created_at", "updated_at")
    hash
  rescue => e
    Rails.logger.error("**** ERROR **** #{e.message}")
    {}
  end
end
