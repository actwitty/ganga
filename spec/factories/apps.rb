# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :app do
  	association :account, :factory => :account
  	sequence(:name){|n| "App Name #{n}" } 
  end
end
