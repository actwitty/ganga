# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :app do
  	association :account, :factory => :account
  	sequence(:description){|n| {"name" => "Test #{n}", "address[city#{n}]" => "bangalore#{n}", "address[country][state]" => "Karnataka#{n}"} }
  end
end
