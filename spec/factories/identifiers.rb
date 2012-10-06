# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :identifier do
  	association :account, :factory => :account
    association :app, :factory => :app
    association :app, :factory => :actor
    sequence(:uid){|n| "identifier_#{n}@email.com" }
  end
end
