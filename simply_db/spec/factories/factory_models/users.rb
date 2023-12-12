FactoryBot.define do
    factory :user do
      sequence(:email) { |n| "user#{n}@example.com" }
      password { 'password123' }
      name_users { 'John Doe' }
  
      trait :artist do
        role { :artist }
      end
    end
  end