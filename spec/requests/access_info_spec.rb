require 'spec_helper'
require 'capybara/json'
include Capybara::Json


describe "home page" do
  before(:each) do
  	# @request.env['HTTP_ACCEPT'] = "application/json"
  	# @request.env['HTTP_ORIGIN'] = "http://www.rulebot.com"

  	@account = FactoryGirl.create(:account)
  	@account.confirm!

  	visit "/accounts/sign_in"
  	#puts response.body.inspect
  	
    fill_in "account_email", :with => "#{@account.email}"
    fill_in "account_password", :with => "#{@account.password}"
    click_button "Sign in"
  end
  it "displays the user's username after successful login" do
  	
  	page.driver.request.env['HTTP_ACCEPT'] = "application/json"
  	page.driver.request.env['HTTP_ORIGIN'] = "http://www.rulebot.com"
	resp = page.driver.post('/app/create', { format: 'json', account_id: @account._id, description: { :email => "john.doe@example.com", domain: "http://www.example.com"}})    
	puts resp.body
  end
end