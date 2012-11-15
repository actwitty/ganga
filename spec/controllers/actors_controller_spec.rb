require 'spec_helper'

describe ActorsController do

  before(:each) do
    @account = FactoryGirl.create(:account)
    @account.confirm!
    sign_in  @account

    @app = FactoryGirl.create(:app, account_id: @account._id)
    @actor = FactoryGirl.create(:actor, account_id: @account._id, app_id: @app._id)
    request.env['HTTP_ACCEPT'] = "application/json"
  end

  describe "create actor" do
    it "should create actor properly" do
      get 'create', { 
                      callback: 'parseUser',
                      app_id: @app._id,
                      properties: { profile: 
                          {:email => "john.doe@example.com",
                          :customer => {:address => {:city => {:geo =>{:lat => 23, :long => 34}, :name => "bangalore"}, :place => ["hello"]}}
                          }, 
                        system: {browser: "chrome", os: "linux"}
        }
      }

      puts JSON.parse(response.body).inspect
      response.status.should eq(200)
      Actor.count.should eq(3)
    end
  end

  describe "Identify" do

    it "should not identify actor with wrong arguments" do
      get  'identify', { app_id: @app._id, id: @actor._id, type: "email"}
      response.status.should eq(422)
    end

    it "should not identify actor with invalid app_id" do
      get  'identify', { app_id: 121212, id: @actor._id, uid: 'alok@gmail.com', type: "email"}
      response.status.should eq(422)
    end

    it "should not identify actor with invalid actor_id" do
      a_pp = FactoryGirl.create(:app, account_id: @account._id)
      actor = FactoryGirl.create(:actor, app: a_pp._id)
      get  'identify', {app_id: @app._id, id: actor._id, uid: 'alok@gmail.com', type: "email"}
      response.status.should eq(422)
    end

    it "should identify actor" do
      expect{
        get  'identify', { app_id: @app._id, id: @actor._id, uid: 'alok@gmail.com', type: "email"}
      }.to change(Identifier, :count).by(1)
      response.status.should eq(200)
    end

    it "should create new actor when no actor is given" do
      expect{
        get  'identify', { app_id: @app._id, uid: 'alok@gmail.com'}
      }.to change(Actor, :count).by(1)
      response.status.should eq(200)
    end

    it "should create two identities if identify called 2 times" do
      expect{
        get  'identify', { app_id: @app._id, id: @actor._id, uid: 'balu@gmail.com', type: "email"}
      }.to change(Actor, :count).by(0)

      expect{
        get  'identify', { app_id: @app._id, uid: 'alok@gmail.com'}
      }.to change(Actor, :count).by(1)

      response.status.should eq(200)
    end


    it "should not re-map identity to malicious actor" do
      expect{
        get  'identify', { app_id: @app._id, id: @actor._id, uid: 'balu@gmail.com'}
      }.to change(Identifier, :count).by(1)

      actor = FactoryGirl.create(:actor)

      expect{
        get  'identify', { app_id: @app._id, id: actor._id, uid: 'balu@gmail.com'}
      }.to change(Actor, :count).by(0)

      response.status.should eq(422)
    end

    it "should not re-map identity to actor of same account but diferent app" do
      expect{
        get  'identify', { app_id: @app._id, id: @actor._id, uid: 'balu@gmail.com'}
      }.to change(Identifier, :count).by(1)

      a_pp = FactoryGirl.create(:app, account_id: @account._id)
      actor = FactoryGirl.create(:actor, app: a_pp._id)

      expect{
        get  'identify', { app_id: @app._id, id: actor._id, uid: 'balu@gmail.com'}
      }.to change(Actor, :count).by(0)

      response.status.should eq(422)
    end


    it "should not re-map identity if already identified" do
      expect{
        get  'identify', { app_id: @app._id, id: @actor._id, uid: 'balu@gmail.com'}
      }.to change(Identifier, :count).by(1)

      actor = FactoryGirl.create(:actor, app_id: @app._id)

      expect{
        get  'identify', {app_id: @app._id, id: actor._id, uid: 'balu@gmail.com'}
      }.to change(Identifier, :count).by(0)

      expect{
        get  'identify', { app_id: @app._id, id: actor._id,uid: 'balu@gmail.com'}
      }.to change(Actor, :count).by(0)

      response.status.should eq(422)
    end    

    it "should re-map actor if same uid and differect actor id" do
      h = { :email => "john.doe@example.com", :name => "hee",
        :customer => {:address => {:city => "Bangalore", :place => "bilekahalli"}
        }
      }
      Identifier.create!(account_id: @app.account_id, app_id: @app._id, actor_id: @actor._id, uid: 'balu@gmail.com')

      actor = Actor.create!(account_id: @app.account_id, app_id: @app._id)
      Event.add!(account_id: @app.account_id, app_id: @app._id, actor_id: actor._id, name: "sign_up", properties: h)

      expect{
        get  'identify', { app_id: @app._id, id: actor._id, uid: 'balu@gmail.com'}
      }.to change(Identifier, :count).by(0)

      #old actor should be deleted by now
      actor = Actor.where(_id: actor._id).first
      actor.should be_blank

      #check if events is assigned to newly mapped actor
      puts Event.count
      p = Event.where(actor_id: @actor._id).first
      p.should_not be_blank

      response.status.should eq(200)
    end

    it "should return mapped identity if called without actor" do
      expect{
        get  'identify', { app_id: @app._id, id: @actor._id, uid: 'balu@gmail.com'}
      }.to change(Identifier, :count).by(1)

      expect{
        get  'identify', { app_id: @app._id, uid: 'balu@gmail.com'}
      }.to change(Actor, :count).by(0)

      response.status.should eq(200)
    end
  end

  describe "Set Properties" do
    before(:each) do
      @h ={ 
            app_id: @app._id, id: @actor._id,
            properties: { profile: 
              {
                :email => "john.doe@example.com", :name => "hee",
                :customer => {:address => {:city => "Bangalore", :place => "bilekahalli"}}, 
              }, 
              system: {browser: "chrome", os: "linux"}
            }
          }
    end
    it "should not set actor with wrong arguments" do
      @h.delete(:app_id)
      get  'set', @h
      response.status.should eq(422)
    end

    it "should not set actor with invalid app_id" do
      @h[:app_id] = 42342342
      get  'set', @h
      response.status.should eq(422)
    end

    it "should not set actor with invalid actor_id" do
      a_pp = FactoryGirl.create(:app, account_id: @account._id)
      actor = FactoryGirl.create(:actor, app: a_pp._id)
      @h[:actor_id] = actor._id
      get  'set', @h
      response.status.should eq(422)
    end
    it "should set schema of actor" do

      get 'set', {app_id: @app._id, id: @actor._id,
        properties: { profile: 
          {
            :email => "john.doe@example.com", :name => "hee",
            :customer => {:address => {:city => "Bangalore", :place => "bilekahalli"}}, 
          }, 
          system: {browser: "chrome", os: "linux"}
        }
      }
      app = App.find(@app._id)
      app.schema["properties"].should_not be_blank
      puts app.schema.inspect

      get 'set', { app_id: @app._id, id: @actor._id,
        properties: { profile: 
          {:email => "john.doe@example.com",
          :customer => {:address => {:city => {:geo =>{:lat => 23, :long => 34}, :name => "bangalore"}, :place => ["hello"]}}
          }, 
          system: {browser: "chrome", os: "linux"}
        }
      }
      app = App.find(@app._id)
      app.schema["properties"].should_not be_blank
      puts app.schema.inspect

      @actor.reload 
      puts @actor.description
    end

    it "should populate event table " do

      get 'set', {  app_id: @app._id, id: @actor._id,
                    properties: { profile: { 
                                    :email => "john.doe@example.com",
                                    :customer => {:address => {:city => "Bangalore"}}
                                  }, 
                                  system: {browser: "chrome", os: "linux"}
                    }
      }
      get 'set', {  app_id: @app._id, id: @actor._id,
                    properties: { profile: { 
                                    :email => "mon.doe@example.com",
                                    :customer => {:address => {:city => "Pune"}}
                                  }, 
                                  system: {browser: "chrome", os: "windows"}
                    }
      }

      get 'set', { account_id: @account._id, app_id: @app._id, id: @actor._id,
                    properties: { profile: { 
                                    :email => "tom.doe@example.com",
                                    :customer => {:address => {:city => "Bangalore"}}
                                  }, 
                                  system: {browser: "chrome", os: "mac"}
                    }
      }
 
      p = Event.where("properties.k" => "customer[address][city]", "properties.v" => "Bangalore").all
      p.size.should equal(2)
      puts p[0].inspect
      @app.reload
      puts @app.schema.inspect

      Event.count.should eq(6)
      @actor.reload 
      puts @actor.description
    end
  end

  describe "Alias Actor" do

    before(:each) do
      get 'create', {  app_id: @app._id,
                       properties: { profile: { 
                                                  :email => "john.doe@example.com",
                                                  :customer => {:address => {:city => "Bangalore"}}
                                                }, 
                                      system: {browser: "chrome", os: "linux"}
                                    }
                      }

      response.status.should eq(200)

      @actor_id = JSON.parse(response.body)["id"]

      get 'identify', {  app_id: @app._id, id: @actor_id, uid: "alok@actwitty.com" }

      response.status.should eq(200)

      get 'identify', {  app_id: @app._id, id: @actor._id, uid: "balu@actwitty.com" }
    end
    
    it "should check the fail cases of aliasing properly" do
      # Invalid arguments
      get 'alias', {  app_id: @app._id,  new_uid: "+1-9911231234"  }
      response.status.should eq(422)

      # uid does not exist
      get 'alias', {  app_id: @app._id, uid: "notexist@actwitty.com", new_uid: "+1-9911231234"  }
      response.status.should eq(422)

      # invalid app id
      get 'alias', { app_id: 1232332, uid: "notexist@actwitty.com", new_uid: "+1-9911231234"  }
      response.status.should eq(422)


      # identifier already assigned
      get 'alias', {  app_id: @app._id, uid: "alok@actwitty.com", new_uid: "balu@actwitty.com"  }
      puts JSON.parse(response.body).inspect
      response.status.should eq(422)

      # should return same actor as of alok@actwitty.com
      get 'alias', {  app_id: @app._id, uid: "alok@actwitty.com", new_uid: "+1-9911231234"  }
      response.status.should eq(200)
    end

    it "should create alias" do
      get 'alias', {  app_id: @app._id, uid: "alok@actwitty.com", new_uid: "+1-9911231234"  }
      response.status.should eq(200)

      get 'alias', { app_id: @app._id, uid: "alok@actwitty.com", new_uid: "ghgrthrgth"  }
      response.status.should eq(200)

      ids = Identifier.where(actor_id: @actor_id).all
      ids.size.should eq(3)
      ids.each {|id| puts id.inspect}
    end
  end

  describe "Read Actor" do
    before(:each) do
      Event.add!( account_id: @app.account_id, app_id: @app._id, actor_id: @actor._id, name: "sign_in",
              properties: { :email => "john.doe@example.com", :customer => {:address => {:city => "Bangalore"}}})

      Event.add!( account_id: @app.account_id, app_id: @app._id, actor_id: @actor._id, name: "sign_in",
        properties: { :email => "mon.doe@example.com", :customer => {:address => {:city => "Pune"}}})

      Event.add!( account_id: @app.account_id, app_id: @app._id, actor_id: @actor._id, name: "sign_in",
        properties: { :email => "tom.doe@example.com", :customer => {:address => {:city => "Delkhi"}}})

      Err.add!( account_id: @app["account_id"], app_id: @app._id, actor_id: @actor._id, 
      properties: { :name => "Something failed",:reason => { err: "I know", code: 402}})

      Err.add!( account_id: @app["account_id"], app_id: @app._id, actor_id: @actor._id,
      properties: { :name => "Javascript failed",:reason => { err: "dont know", code: 402}})

      Conversion.add!( account_id: @app["account_id"], app_id: @app._id, actor_id: @actor._id,
      properties: { :button => "clicked",:times => {:time => ["20/12/2011", "19/11/2012"], :count => 30}})

      Conversion.add!( account_id: @app["account_id"], app_id: @app._id, actor_id: @actor._id,
      properties: { :button => "hovered",:times => {:time => ["20/12/2011", "19/11/2012"], :count => 30}})


      Actor.count.should eq(1)
      Event.count.should eq(3)

      Identifier.create!(account_id: @actor.account_id, app_id: @actor.app_id, actor_id: @actor._id, uid: 'balu@gmail.com', type: "fb_uid")
      Identifier.create!(account_id: @actor.account_id, app_id: @actor.app_id, actor_id: @actor._id, uid: 'alok@gmail.com', type: "email")

   
      @h ={ app_id: @app._id, uid: "balu@gmail.com", events: true, identifiers: true, conversions: true, errors: true }
    end
    it "should not set actor with wrong arguments" do
      @h.delete(:app_id)
      get  'read', @h
      response.status.should eq(422)
    end

    it "should not set actor with invalid app_id" do
      @h[:app_id] = 42342342
      get  'read', @h
      response.status.should eq(422)
    end

    it "should not set actor with invalid actor_id" do
      a_pp = FactoryGirl.create(:app, account_id: @account._id)
      actor = FactoryGirl.create(:actor, app: a_pp._id)
      @h[:id] = actor._id
      get  'read', @h
      response.status.should eq(422)
    end
    it "should read actor's data" do
      get 'set', {  app_id: @app._id, id: @actor._id,
                    properties: { profile: { 
                                    :email => "mon.doe@example.com",
                                    :customer => {:address => {:city => "Pune"}}
                                  }, 
                                  system: {browser: "chrome", os: "windows"}
                    }
      }
      get 'read', { app_id: @app._id, id: @actor._id, events: true }

      puts JSON.parse(response.body).inspect
      response.status.should eq(200)

      get 'read', { app_id: @app._id, uid: "balu@gmail.com", events: true, identifiers: true, conversions: true, errors: true }

      puts JSON.parse(response.body).inspect
      response.status.should eq(200)

      e = Event.where(id: @actor._id).gte("properties.v" => "Delti" )
    end
  end
end
