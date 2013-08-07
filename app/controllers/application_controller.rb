require 'authenticate'

class ApplicationController < ActionController::Base
  protect_from_forgery
  #respond_to :json, :html

  include Authenticate


  def self.authenticate_request(params = {}, options = [])
    Rails.logger.info("Enter Authenticate Request")

    if params[:origin].blank?
      before_filter Authenticate::Origin.new
    else
      before_filter Authenticate::Origin.new, params[:origin]
    end

    if params[:api].blank?
      before_filter Authenticate::Api.new
    else
      before_filter Authenticate::Api.new, params[:api]
    end

    if params[:account].blank?
      before_filter Authenticate::Acc.new
    else
      before_filter Authenticate::Acc.new, params[:account]
    end
  rescue => e 
    Rails.logger.error("**** ERROR **** #{er(e)}")
    #head :unauthorized
  end
end
