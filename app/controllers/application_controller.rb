class ApplicationController < ActionController::Base
  protect_from_forgery
  #respond_to :json, :html

  include Authenticate

  def after_sign_in_path_for(resource_or_scope)
    root_path
  end

  def self.authenticate_request(params = {}, options = [])
    Rails.logger.info("Enter Authenticate Request")
    
    if params[:origin].blank?
      before_filter Authenticate::Origin.new
    else
      before_filter Authenticate::Origin.new, params[:origin]
    end
    before_filter Authenticate::Api.new
    before_filter Authenticate::Acc.new

    after_filter  Authenticate::Api.new
  rescue => e 
    Rails.logger.error("**** ERROR **** #{er(e)}")
    #head :unauthorized
  end
end
