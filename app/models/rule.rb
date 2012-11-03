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
  ##  :account_id => "121212" [MANDATORY]
  ##  :app_id => "1234444',   [MANDATORY]
  ##  :rule_id => "234234234" [MANDATORY]
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

    if params[:account_id].blank? or params[:app_id].blank? or params[:rule_id].blank? or params[:rule].blank?
      raise et("rule.invalid_argument_in_update") 
    end

    app = App.where(account_id: params[:account_id], _id: params[:app_id] ).first
    raise et("rule.invalid_app_id", id: params[:app_id]) if app.blank?
    
    rule = app.rules.where(_id: params[:rule_id]).first
    raise et("rule.invalid_rule_id") if rule.blank?

    rule.update_attributes(params[:rule])

    {:return => true, :error => nil}
  rescue => e
    Rails.logger.error("**** ERROR **** #{er(e)}")
    {:return => nil, :error => e}
  end
end
