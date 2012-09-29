require 'spec_helper'
require 'factory_girl'
require 'pp'
require 'utility'

describe Event do

  describe "create event" do
    it "should create event" do
      hash = {name: "sign_up", time: "2343434", location: "Delhi", property: {customer: {id: 123, address: {city: "bangalore", geo: {lat: 2334.45, long: 34343.00}}}}}
      schema = {}

      actor = FactoryGirl.create(:actor)
      e = actor.events.create!(hash)
      e.should_not be_blank

      # #schema = structure_of_hash(hash, schema)
      schema = Utility.hash_serialize(hash: hash)
      # pp schema
    end
  end
end
