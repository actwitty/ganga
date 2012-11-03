require 'spec_helper'

describe RulesController do
  login_account

  before(:each) do
    @account = FactoryGirl.create(:account)
    @app = FactoryGirl.create(:app, account_id: @account._id)
    @actor = FactoryGirl.create(:actor, account_id: @account._id, app_id: @app._id)
    @rule = {
      name: 'A fancy rule', event: 'singup',  owner: 'client',
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
  end

  describe "create event" do
    it "should not create rule with invalid app id" do
      get 'create', {
        account_id: @account._id,
        app_id: "1234444",
        rule: @rule
      }
      puts JSON.parse(response.body).inspect
      response.status.should eq(422)
      Rule.count.should eq(0)
    end

    it "should not create rule with invalid arguments" do
      get 'create', {
        account_id: @account._id,
        rule: @rule
      }
      puts JSON.parse(response.body).inspect
      response.status.should eq(422)
      Rule.count.should eq(0)
    end

    it "should create rule" do
      get 'create', {
        account_id: @account._id,
        app_id: @app._id,
        rule: @rule
      }
      puts JSON.parse(response.body).inspect
      response.status.should eq(200)
      @app.reload
      @app.rules.count.should eq(1)

      a = App.read(account_id: @account._id, app_id: @app._id, event: false)
      puts a.inspect
      puts a[:return][:app][:rules][0]["id"].inspect
    end
  end

  describe "Update Rule" do
    it "should update rule" do
      @app.rules << Rule.new(@rule)
      @app.save!

      @rule[:event] = "new_one"
      @rule[:conditions] = []
      get 'update', {
        account_id: @account._id,
        app_id: @app._id,
        rule_id:  @app.rules[0].id.to_s,
        rule: @rule
      }

      puts @app.rules[0].inspect

      @app.reload
      response.status.should eq(200)
      rule = @app.rules.where(_id:@app.rules[0].id.to_s).first

      puts rule.inspect

      rule.conditions.should be_blank
    end
  end
end
