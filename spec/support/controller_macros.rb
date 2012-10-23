require 'json'
module ControllerMacros
  def login_account
    before(:each) do
      @request.env["devise.mapping"] = Devise.mappings[:account]
      account = FactoryGirl.create(:account)
      account.confirm!
      sign_in  account# Using factory girl as an example
    end
  end
end

RSpec.configure do |config|
  config.extend ControllerMacros, :type => :controller
end