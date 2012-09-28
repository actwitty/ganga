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

    it "should check if uid Actor is same as current actor" do
      Identifier.create!(app_id: @app._id, actor_id: @actor._id, uid: 'balu@gmail.com')
      
      expect{
        post  'identify', {app_id: @app._id,  uid: 'balu@gmail.com'}
      }.to change(Identifier, :count).by(0)

      response.status.should eq(200)
    end
  end

  describe "Set Properties" do
    it "should set property of actor" do

    end
  end
end
