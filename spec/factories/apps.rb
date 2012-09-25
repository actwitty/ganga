# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :app do
  	association :account, :factory => :account
  	sequence(:description){|n| {name:"App Name #{n}", url: "http://www.actiwtty.com"} } 
  end
end
