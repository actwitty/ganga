# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :account do
  	sequence(:email) { |n| "account_#{n}@actwitty.com" }
  	password "lemonyssecret"
  	password_confirmation { |u| u.password }
  	sequence(:name){|n| "Account Name #{n}" }
  end
end
