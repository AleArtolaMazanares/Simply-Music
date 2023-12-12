FactoryBot.define do
    factory :artist do
      sequence(:name_artist) { |n| "Artist #{n}" }
      social { 'Social Media Link' }
      description_artist { 'Artist Description' }
      tags { 'Artist Tags' }
      association :user
    end
  end