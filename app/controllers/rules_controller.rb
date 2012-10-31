class RulesController < ApplicationController
  
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

  # OUTPUT => {
  ##            rule_id: "1211221"
  ##          }
  def create
    Rails.logger.info("Enter Rule Update")

    params[:account_id] = current_account._id if Rails.env != "test"
    ret = Rule.add!(params)

    raise ret[:error] if !ret[:error].blank?

    render json: {rule_id: ret[:return]}, status: 200
  rescue => e
    Rails.logger.error("**** ERROR **** #{er(e)}")
    render json: {errors: e.message}, status: 422
  end


  ## update a rule

  # INPUT
  ## {
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
  ##            status: true or false
  ##          }
  def update
    Rails.logger.info("Enter Rule Update")

    params[:account_id] = current_account._id if Rails.env != "test"
    ret = Rule.update(params)

    raise ret[:error] if !ret[:error].blank?

    render json: {status: ret[:return]}, status: 200
  rescue => e
    Rails.logger.error("**** ERROR **** #{er(e)}")
    render json: {errors: e.message}, status: 422
  end
end
