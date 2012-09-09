# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :event do
  	association :actor, :factory => :actor
  	sequence(:name) { |n| "App Name #{n}" } 
  end
end
