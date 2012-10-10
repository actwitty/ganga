require 'spec_helper'

describe ActorsController do
  login_account

  before(:each) do
    @account = FactoryGirl.create(:account)
    @app = FactoryGirl.create(:app, account_id: @account._id)
    @actor = FactoryGirl.create(:actor, account_id: @account._id, app_id: @app._id)
  end

  describe "create actor" do
    it "should create actor properly" do
      post 'create', { app_id: @app._id,
        properties: { :email => "john.doe@example.com",
          :customer => {:address => {:city => "Bangalore"}
          }
        }
      }
      puts JSON.parse(response.body).inspect
      response.status.should eq(200)
      Actor.count.should eq(2)
    end
  end

  describe "Identify" do

    it "should identify actor" do
      expect{
        post  'identify', {app_id: @app._id, actor_id: @actor._id, uid: 'alok@gmail.com', type: "email"}
      }.to change(Identifier, :count).by(1)
      response.status.should eq(200)
    end

    it "should create new actor when no actor is given" do
      expect{
        post  'identify', {app_id: @app._id, uid: 'alok@gmail.com'}
      }.to change(Actor, :count).by(1)
      response.status.should eq(200)
    end

    it "should create two identities if identify called 2 times" do
      expect{
        post  'identify', {app_id: @app._id, actor_id: @actor._id, uid: 'balu@gmail.com', type: "email"}
      }.to change(Actor, :count).by(0)

      expect{
        post  'identify', {app_id: @app._id, uid: 'alok@gmail.com'}
      }.to change(Actor, :count).by(1)

      response.status.should eq(200)
    end

    it "should not re-assign identify" do
      expect{
        post  'identify', {app_id: @app._id, actor_id: @actor._id, uid: 'balu@gmail.com'}
      }.to change(Identifier, :count).by(1)

      actor = FactoryGirl.create(:actor)

      expect{
        post  'identify', {app_id: @app._id, actor_id: actor._id,uid: 'balu@gmail.com'}
      }.to change(Actor, :count).by(-1)

      response.status.should eq(200)
    end

    it "should re-map actor if " do
      h = { :email => "john.doe@example.com", :name => "hee",
        :customer => {:address => {:city => "Bangalore", :place => "bilekahalli"}
        }
      }
      Identifier.create!(account_id: @app.account_id, app_id: @app._id, actor_id: @actor._id, uid: 'balu@gmail.com')

      actor = Actor.create!(account_id: @app.account_id, app_id: @app._id)
      Event.add!(account_id: @app.account_id, app_id: @app._id, actor_id: actor._id, name: "sign_up", properties: h)

      expect{
        post  'identify', {app_id: @app._id, actor_id: actor._id, uid: 'balu@gmail.com'}
      }.to change(Identifier, :count).by(0)

      #old actor should be deleted by now
      actor = Actor.where(_id: actor._id).first
      actor.should be_blank

      #check if events is assigned to newly mapped actor
      p = Event.where(actor_id: @actor._id).first
      p.should_not be_blank

      response.status.should eq(200)
    end
  end

  describe "Set Properties" do

    it "should set schema of actor" do

      post 'set', { app_id: @app._id, actor_id: @actor._id,
        properties: { :email => "john.doe@example.com", :name => "hee",
          :customer => {:address => {:city => "Bangalore", :place => "bilekahalli"}
          }
        }
      }
      app = App.find(@app._id)
      app.schema["properties"].should_not be_blank
      puts app.schema.inspect

      post 'set', { app_id: @app._id, actor_id: @actor._id,
        properties: { :email => "john.doe@example.com",
          :customer => {:address => {:city => {:geo =>{:lat => 23, :long => 34}, :name => "bangalore"}, :place => ["hello"]}
          }
        }
      }
      app = App.find(@app._id)
      app.schema["properties"].should_not be_blank
      puts app.schema.inspect
    end

    it "should populate event table " do

      post 'set', { app_id: @app._id, actor_id: @actor._id,
        properties: { :email => "john.doe@example.com",
          :customer => {:address => {:city => "Bangalore"}
          }
        }
      }
      post 'set', { app_id: @app._id, actor_id: @actor._id,
        properties: { :email => "mon.doe@example.com",
          :customer => {:address => {:city => "Pune"}
          }
        }
      }
      post 'set', { app_id: @app._id, actor_id: @actor._id,
        properties: { :email => "tom.doe@example.com",
          :customer => {:address => {:city => "Bangalore"}
          }
        }
      }
      p = Event.where("properties.k" => "customer[address][city]", "properties.v" => "Bangalore").all
      p.size.should equal(2)
      puts p[0].inspect
    end
  end

  describe "Alias Actor" do

    before(:each) do
      post 'create', { app_id: @app._id,
        properties: { :email => "john.doe@example.com",
          :customer => {:address => {:city => "Bangalore"}
          }
        }
      }

      response.status.should eq(200)

      @actor_id = JSON.parse(response.body)["id"]

      post 'identify', { app_id: @app._id, actor_id: @actor_id, uid: "alok@actwitty.com" }

      response.status.should eq(200)
      post 'identify', { app_id: @app._id, actor_id: @actor._id, uid: "balu@actwitty.com" }
    end
    
    it "should check the fail cases of aliasing properly" do
      # Invalid arguments
      post 'alias', { app_id: @app._id,  new_uid: "+1-9911231234"  }
      response.status.should eq(422)

      # uid does not exist
      post 'alias', { app_id: @app._id, uid: "notexist@actwitty.com", new_uid: "+1-9911231234"  }
      response.status.should eq(422)

      # identifier already assigned
      post 'alias', { app_id: @app._id, uid: "alok@actwitty.com", new_uid: "balu@actwitty.com"  }
      puts JSON.parse(response.body).inspect
      response.status.should eq(422)

      # should return same actor as of alok@actwitty.com
      post 'alias', { app_id: @app._id, uid: "alok@actwitty.com", new_uid: "+1-9911231234"  }
      response.status.should eq(200)
    end

    it "should create alias" do
      post 'alias', { app_id: @app._id, uid: "alok@actwitty.com", new_uid: "+1-9911231234"  }
      response.status.should eq(200)

      post 'alias', { app_id: @app._id, uid: "alok@actwitty.com", new_uid: "ghgrthrgth"  }
      response.status.should eq(200)

      ids = Identifier.where(actor_id: @actor_id).all
      ids.size.should eq(3)
      ids.each {|id| puts id.inspect}
    end
  end

  describe "Read Actor" do
    
    it "should read actor's data" do
      Event.add!( account_id: @app.account_id, app_id: @app._id, actor_id: @actor._id, name: "sign_in",
              properties: { :email => "john.doe@example.com", :customer => {:address => {:city => "Bangalore"}}})

      Event.add!( account_id: @app.account_id, app_id: @app._id, actor_id: @actor._id, name: "sign_in",
        properties: { :email => "mon.doe@example.com", :customer => {:address => {:city => "Pune"}}})

      Event.add!( account_id: @app.account_id, app_id: @app._id, actor_id: @actor._id, name: "sign_in",
        properties: { :email => "tom.doe@example.com", :customer => {:address => {:city => "Bangalore"}}})

      Actor.count.should eq(1)
      Event.count.should eq(3)

      get 'read', {app_id: @app._id, actor_id: @actor._id, events: true }

      puts JSON.parse(response.body).inspect
      response.status.should eq(200)

      Identifier.create!(account_id: @actor.account_id, app_id: @actor.app_id, actor_id: @actor._id, uid: 'balu@gmail.com', type: "fb_uid")
      Identifier.create!(account_id: @actor.account_id, app_id: @actor.app_id, actor_id: @actor._id, uid: 'alok@gmail.com', type: "email")

      get 'read', {app_id: @app._id, uid: "balu@gmail.com", events: true, identifiers: true }

      puts JSON.parse(response.body).inspect
      response.status.should eq(200)
    end
  end
end
