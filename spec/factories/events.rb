# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :event do
  	association :actor, :factory => :actor
  	association :app, :factory => :app
  	sequence(:name){|n| "Event Name #{n}" }
  end
end
