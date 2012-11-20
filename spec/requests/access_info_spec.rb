require 'spec_helper'
require 'capybara/json'
include Capybara::Json

#request object is not available in request spec

describe "access control" do

  before(:each) do
    @account = FactoryGirl.create(:account)
    @account.confirm!

    visit "/accounts/sign_in"
    #puts response.body.inspect

    fill_in "account_email", :with => "#{@account.email}"
    fill_in "account_password", :with => "#{@account.password}"
    click_button "Sign in"

    resp = page.driver.post('/app/create', { format: 'json', account_id: @account._id, description: { :name => "tito", :email => "john.doe@example.com", domain: "http://rulebot.com"}})
    @json = JSON.parse(resp.body)
  end
  
  it "should be able to make session request" do
    resp = page.driver.get('/app/read',  { format: 'json', id: @json["id"], actors: true})
    json = JSON.parse(resp.body)
    puts json
  end
  it "should not authenticate cross domain" do
    # lets make out of session request
    # post /app/create not supported for cross site
    post('/app/update', { format: 'json',  id: @json["id"], description: { :email => "tom.doe@example.com", mobile: "943479474"}},  { "HTTP_HOST" => "http://rulebot.com" })
    puts JSON.parse(response.body)
    response.status.should_not eq(200)
  end


  it "should authenticate origin for cross_site" do
    # lets make out of session request
    get('/app/read', {  format: 'json', id: @json["id"], actors: true},  { "HTTP_HOST" => "http://rulebot.com" })
    puts JSON.parse(response.body)
    response.status.should eq(200)  
    #resp.status.should eq(200)
  end
  
  it "should not authenticate api" do
    # lets make out of session request
    # wrong token
    post('/app/update',{ format: 'json', token: "534645645645", id: @json["id"], description: { :name => "hello", :email => "tom.doe@example.com", mobile: "943479474"}},  { "HTTP_HOST" => "" })
    puts JSON.parse(response.body)
    response.status.should_not eq(200)
  end

  it "should authenticate api" do
    # lets make out of session request

    #request object is not available in request spec
    post('/app/update', { format: 'json', token: @json["description"]["token"], id: @json["id"], description: { :name => "hello", :email => "tom.doe@example.com", mobile: "943479474"}},  { "HTTP_HOST" => "" })
    puts JSON.parse(response.body)
    response.status.should eq(200)
  end
end