require 'spec_helper'
require 'capybara/json'
include Capybara::Json


describe "access control" do
  before(:each) do
    @account = FactoryGirl.create(:account)
    @account.confirm!

    visit "/accounts/sign_in"
    #puts response.body.inspect

    fill_in "account_email", :with => "#{@account.email}"
    fill_in "account_password", :with => "#{@account.password}"
    click_button "Sign in"
  end


  it "authenticate origin for cross_site" do
    resp = page.driver.post('/app/create', { format: 'json', account_id: @account._id, description: { :email => "john.doe@example.com", domain: "www.example.com"}})
    json = JSON.parse(resp.body)

    # lets make out of session request
    get '/app/read', { format: 'json', id: json["id"], actors: true}
    puts JSON.parse(response.body)
    response.status.should eq(200)
    #resp.status.should eq(200)
  end
end