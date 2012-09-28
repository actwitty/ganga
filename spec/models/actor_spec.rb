require 'spec_helper'

describe Actor do
  pending "add some examples to (or delete) #{__FILE__}"
  it "should create actor" do
  	app = FactoryGirl.create(:app)
  	actor = Actor.create!(app_id: app._id)
  	actor.identifiers.create!(app_id: app._id, uid: "params[:uid]")

  end
end
