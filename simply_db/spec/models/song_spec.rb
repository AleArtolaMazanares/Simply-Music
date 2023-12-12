# spec/models/song_spec.rb
require 'rails_helper'

RSpec.describe Song, type: :model do
  describe 'validations' do
    it { should validate_presence_of(:title_song) }
    it { should validate_presence_of(:song_file) }
    it { should validate_presence_of(:genre) }
    it { should validate_presence_of(:song_duration) }
    it { should validate_presence_of(:content_artist_id) }
  end
end
