# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :event do
  	association :app, :factory => :app
  	association :actor, :factory => :actor
  	association :account, :factory => :account
  	sequence(:name){|n| "event_name_#{n}"}
  	sequence(:properties){|n| {"address[city#{n}]" => "bangalore#{n}", "address[country][state]" => "Karnataka#{n}"} }
  end
end
