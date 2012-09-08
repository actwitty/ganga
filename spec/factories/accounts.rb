# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :account do
  	sequence(:email) { |n| "lemony#{n}@lemonbag.com" }
  	password "lemonyssecret"
  	password_confirmation { |u| u.password }
  	sequence(:name){|n| "lemony lime" }
  	sequence(:photo ){|n| "images/id_#{n}" }
  end
end
