require 'spec_helper'

describe ErrorsController do
  login_account

  before(:each) do
    @account = FactoryGirl.create(:account)
    @wrong_app = FactoryGirl.create(:app)
    request.env['HTTP_ACCEPT'] = "application/json"
  end  
end

