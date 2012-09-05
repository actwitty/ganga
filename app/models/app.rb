class App
  include Mongoid::Document
  
  belongs_to :account
  
end
