require 'spec_helper'
require 'factory_girl'
require 'pp'
require 'utility'

describe Event do

  describe "create event" do
    it "should create event" do
      hash = {name: "sign_up", property: {customer: {id: 123, address: {city: "bangalore"}}}}
      schema = {}

      actor = FactoryGirl.create(:actor)
      e = actor.events.create(hash)
      e.should_not be_blank

      # #schema = structure_of_hash(hash, schema)
      # schema = Utility.hash_structure(hash: hash, schema: schema)
      # pp schema

      # schema = Utility.hash_structure(hash: hash, schema: schema)
      # pp schema
    end
  end
end
