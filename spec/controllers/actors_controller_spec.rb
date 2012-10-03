require 'spec_helper'

describe ActorsController do
  login_account
  before(:each) do
    @app = FactoryGirl.create(:app)
    @actor = FactoryGirl.create(:actor)
  end
  describe "Identify" do

    it "should identify actor" do
      expect{
        post  'identify', {app_id: @app._id, actor_id: @actor._id, uid: 'alok@gmail.com'}
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
        post  'identify', {app_id: @app._id, actor_id: @actor._id, uid: 'balu@gmail.com'}
      }.to change(Identifier, :count).by(1)

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
      }.to change(Actor, :count).by(0)

      response.status.should eq(200)
    end

    it "should re-map actor if " do
      h = { :email => "john.doe@example.com", :name => "hee",
          :customer => {:address => {:city => "Bangalore", :place => "bilekahalli"}
          }
        }
      Identifier.create!(app_id: @app._id, actor_id: @actor._id, uid: 'balu@gmail.com')
      
      actor = Actor.create(app_id: @app._id)
      Property.create!(actor_id: actor._id, properties: h)

      expect{
        post  'identify', {app_id: @app._id, actor_id: actor._id, uid: 'balu@gmail.com'}
      }.to change(Identifier, :count).by(0)

      #old actor should be deleted by now
      actor = Actor.where(_id: actor._id).first
      actor.should be_blank

      #check if property is assigned to newly mapped actor
      p = Property.where(actor_id: @actor._id).first
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
      app.schema.should_not be_blank
      puts app.schema.inspect

      post 'set', { app_id: @app._id, actor_id: @actor._id,
        properties: { :email => "john.doe@example.com",
          :customer => {:address => {:city => {:geo =>{:lat => 23, :long => 34}, :name => "bangalore"}}
          }
        }
      }
      app = App.find(@app._id)
      puts app.schema.inspect
    end

    it "should populate property table " do
      
      post 'set', { app_id: @app._id, actor_id: @actor._id,
        properties: { :email => "john.doe@example.com",
          :customer => {:address => {:city => "Bangalore"}
          }
        }
      }
      app = App.find(@app._id)
      app.schema.should_not be_blank
    end
  end
end
