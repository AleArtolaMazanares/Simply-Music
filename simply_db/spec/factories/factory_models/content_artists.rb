FactoryBot.define do
    factory :content_artist do
      sequence(:name) { |n| "Content Artist #{n}" }
      image { 'image.jpg' }
      description { 'Content Artist Description' }
      genre { 'Content Genre' }
      association :user
    end
  end