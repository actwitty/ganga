# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :actor do
  	association :account, :factory => :account
    association :app, :factory => :app 
  end
end
