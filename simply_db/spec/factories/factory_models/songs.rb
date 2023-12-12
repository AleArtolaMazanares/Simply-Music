# spec/factories/songs.rb
FactoryBot.define do
  factory :song do
    sequence(:title_song) { |n| "Song #{n}" }
    genre { 'Song Genre' }
    song_duration { 180 }
    content_artist_id { 1 }
  end
end
