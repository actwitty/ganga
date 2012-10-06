class RulesController < ApplicationController
  respond_to :json, :html


 def category
    json_data = [
                   { category: 'date', type: 'date'},
                   { category: 'username', type: 'string'},
                   { category: 'browser_version', type: 'string' },
                ]
    respond_with json_data.to_json
                  
              
 end

def editRule
      response_json = {}
      Rails.logger.debug("#{__FILE__}:#{__method__}: Response :#{response_json}") 
      if request.xhr?
        response_json[:success ] = true
              render :json => response_json, :status => 200
      end            
 end  


 def submitRule
      response_json = {}
      Rails.logger.debug("#{__FILE__}:#{__method__}: Response :#{response_json}") 
      if request.xhr?
        response_json[:success] = true
              render :json => response_json, :status => 200
      end            
 end  

end


