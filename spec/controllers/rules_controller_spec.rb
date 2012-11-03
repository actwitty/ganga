require 'spec_helper'

describe RulesController do
  login_account

  before(:each) do
    @account = FactoryGirl.create(:account)
    @app = FactoryGirl.create(:app, account_id: @account._id)
    @actor = FactoryGirl.create(:actor, account_id: @account._id, app_id: @app._id)
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

    request.env['HTTP_ACCEPT'] = "application/json"
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
    before(:each) do
      @app.rules << Rule.new(@rule)
      @app.save!

      @rule[:event] = "new_one"
      @rule[:conditions] = []
    end
    it "should not update rule for invalid arguments" do
      get 'update', {
        account_id: @account._id,
        rule_id:  @app.rules[0].id.to_s,
        rule: @rule
      }
      response.status.should eq(422)
    end

    it "should not update rule for invalid value of arguments" do
      get 'update', {
        account_id: @account._id,
        app_id: "1312312312",
        rule_id:  @app.rules[0].id.to_s,
        rule: @rule
      }
      response.status.should eq(422)
    end

    it "should not update rule for invalid rule id" do
      get 'update', {
        account_id: @account._id,
        app_id: @app._id,
        rule_id:  3433434,
        rule: @rule
      }
      response.status.should eq(422)
    end

    it "should update rule" do
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

  describe "Read Rule" do
    before(:each) do
      @app.rules << Rule.new(@rule)

      @rule[:event] = "sign_in"
      @rule[:conditions] = ["sadasdasdasd", "dsdasdasd"]
      @app.rules << Rule.new(@rule)

      @rule[:event] = "sign_up"
      @rule[:conditions] = []
      @app.rules << Rule.new(@rule)

      @app.save!
    end

    it "should not read rule for invalid arguments" do
      get 'read', {
        account_id: @account._id,
        rule_id:  @app.rules[0].id.to_s,
      }
      response.status.should eq(422)
    end

    it "should not read rule for invalid value of arguments" do
      get 'read', {
        account_id: @account._id,
        app_id: "1312312312",
        rule_id:  @app.rules[0].id.to_s,
      }
      response.status.should eq(422)
    end

    it "should not read rule for invalid rule id" do
      get 'read', {
        account_id: @account._id,
        app_id: @app._id,
        rule_id:  3433434,
      }
      response.status.should eq(422)
    end
    it "should not read rule for invalid event name" do
      get 'read', {
        account_id: @account._id,
        app_id: @app._id,
        event:  "invalid_event",
      }
      
      puts JSON.parse(response.body).inspect

      resp = JSON.parse(response.body)
      resp["rules"].should be_blank
      
      response.status.should eq(200)
    end
    it "should read rule with valid id" do
      get 'read', {
        account_id: @account._id,
        app_id: @app._id,
        rule_id:  @app.rules[0].id.to_s,
      }
      puts JSON.parse(response.body).inspect
      response.status.should eq(200)
    end
    it "should read all rules with valid event name" do
      get 'read', {
        account_id: @account._id,
        app_id: @app._id,
        event: "sign_up",
      }
      puts JSON.parse(response.body).inspect
      response.status.should eq(200)
    end

    it "should read all rules of an app" do
      get 'read', {
        account_id: @account._id,
        app_id: @app._id,
        
      }
      puts JSON.parse(response.body).inspect
      response.status.should eq(200)
    end
  end

  describe "Delete Rule" do
    before(:each) do
      @app.rules << Rule.new(@rule)

      @rule[:event] = "sign_in"
      @rule[:conditions] = ["sadasdasdasd", "dsdasdasd"]
      @app.rules << Rule.new(@rule)

      @rule[:event] = "sign_up"
      @rule[:conditions] = []
      @app.rules << Rule.new(@rule)

      @app.save!
    end

    it "should not delete rule for invalid arguments" do
      get 'delete', {
        account_id: @account._id,
        rule_id:  @app.rules[0].id.to_s,
      }
      response.status.should eq(422)
    end

    it "should not delete rule for invalid value of arguments" do
      get 'delete', {
        account_id: @account._id,
        app_id: "1312312312",
        rule_id:  @app.rules[0].id.to_s,
      }
      response.status.should eq(422)
    end

    it "should not delete rule for invalid rule id" do
      get 'delete', {
        account_id: @account._id,
        app_id: @app._id,
        rule_id:  3433434,
      }
      @app.reload
      @app.rules.count.should eq(3)
      response.status.should eq(200)
    end
    it "should not delete rule for invalid event name" do
      get 'delete', {
        account_id: @account._id,
        app_id: @app._id,
        event:  "invalid_event",
      }
      @app.reload
      @app.rules.count.should eq(3)
      
      response.status.should eq(200)
    end
    it "should delete rule with valid id" do
      get 'delete', {
        account_id: @account._id,
        app_id: @app._id,
        rule_id:  @app.rules[0].id.to_s,
      }
      @app.reload
      @app.rules.count.should eq(2)
      response.status.should eq(200)
    end
    it "should read all rules with valid event name" do
      get 'delete', {
        account_id: @account._id,
        app_id: @app._id,
        event: "sign_up",
      }
      @app.reload
      @app.rules.count.should eq(1)
      response.status.should eq(200)
    end

    it "should read all rules of an app" do
      get 'delete', {
        account_id: @account._id,
        app_id: @app._id,
      }
      @app.reload
      @app.rules.count.should eq(0)
      response.status.should eq(200)
    end
  end
end
