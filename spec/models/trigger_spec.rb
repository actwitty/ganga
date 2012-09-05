require 'spec_helper'

describe Trigger do
  it "should create a trigger" do
    a = Trigger.create(name: 23, content: "me")
    a.should_not be_blank
  end
end