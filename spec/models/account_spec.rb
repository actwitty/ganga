require 'spec_helper'
require 'factory_girl'

describe Account do
	describe "Creation" do
		it "should create account" do
			a = FactoryGirl.create(:account)
			puts a.inspect
  			a.should_not be_nil
  		end
	end  
end
