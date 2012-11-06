class ErrsController < ApplicationController
	protect_from_forgery
  before_filter :authenticate_account!
  #before_filter :authenticate_app!

  respond_to :json
  
end
