require 'spec_helper'

describe AccountsController do

  before(:each) do
    @account = FactoryGirl.create(:account)
    @account.confirm!
    sign_in  @account

    @app = FactoryGirl.create(:app, account_id: @account._id)
    @actor = FactoryGirl.create(:actor, app_id: @app._id,  account_id: @account._id)

    Actor.set(account_id: @actor.account_id, app_id: @actor.app_id, id: @actor._id, 
        properties: { profile: { 
                                  :email => "john.doe@example.com",
                                  :customer => {:address => {:city => "Bangalore"}}
                               }, 
                      system: {browser: "chrome", os: "linux"}
                    }
                )
    @actor.reload
    @rule = {
      name: 'A fancy rule', event: 'sign_up',  owner: 'client',
      action: 'topbar',
      action_param: {
        text: "A quickbrown fox jumps over a lazy dog",
        href: "http://www.google.com",
        color: "#333333",
        width: "50",
      },
      conditions: [
        {
          property: 'person[email]',
          negation: 'true',
          operation: 'ew',
          value1: '@gmail.com',
          connect: 'and',
        },
      ]
    }

    Rule.add!(account_id: @account._id, app_id: @app._id, rule: @rule)
    request.env['HTTP_ACCEPT'] = "application/json"
  end

  describe "Account Read" do

    it "should read the app detail" do 

      Event.add!( "account_id" =>  @account._id, "app_id" =>  @app._id, "actor_id" =>  @actor._id, "name" => "sign_in",
      "properties" =>  { "email" => "john.doe@example.com", "customer" => {"address"  => {"city" => "Bangalore"}}})

      Event.add!( "account_id" =>  @account._id, "app_id" =>  @app._id, "actor_id" =>  @actor._id,  "name" => "sign_in",
      "properties" =>  { "email" => "mon.doe@example.com", "customer" => {"address"  => {"city" => "Pune"}}})

      Event.add!( "account_id" =>  @account._id, "app_id" =>  @app._id, "actor_id" =>  @actor._id, "name" => "sign_in",
      "properties" =>  { "email" => "tom.doe@example.com", "customer" => {"address"  => {"city" => "Bangalore"}}})

      Err.add!( "account_id" =>  @account._id, "app_id" =>  @app._id,  
      "properties" =>  { "name" =>  "Something failed","reason" => { "err" => "I know", "code" => 402}})

      Err.add!( "account_id" =>  @account._id, "app_id" =>  @app._id, "actor_id" =>  @actor._id,
      "properties" =>  { "name" => "Javascript failed","reason" => { "err"=> "dont know", "code" => 402}})

      Conversion.add!( "account_id" =>  @account._id, "app_id" =>  @app._id, "actor_id" =>  @actor._id, 
      "properties" =>  { "button" => "clicked","times" => {"time" => ["20/12/2011", "19/11/2012"], "count" => 30}})

      Conversion.add!( "account_id" =>  @account._id, "app_id" =>  @app._id, "actor_id" =>  @actor._id,
      "properties" =>  { "button" => "hovered","times" => {"time" => ["20/12/2011", "19/11/2012"], "count" => 30}})

      get 'read', { events: true, actors: true, conversions: true, errors: true}

      h = JSON.parse(response.body)
      puts h.inspect
      h["events"].size.should eq(3)
      response.status.should eq(200)
      puts Event.count
    end
  end

  describe "List Apps" do
    it "should list all the apps" do
      get 'list_apps'
      response.status.should eq(200)
      puts JSON.parse(response.body).inspect
    end
  end
end
