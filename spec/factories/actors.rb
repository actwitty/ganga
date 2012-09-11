# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :actor do
    association :app, :factory => :app
    sequence(:name){|n| "Actor Name #{n}" }
    sequence(:name){|n| "actor_#{n}@actwitty.com" }
  end
end
