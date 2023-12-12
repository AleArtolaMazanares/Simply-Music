# spec/models/content_artist_spec.rb
require 'rails_helper'

RSpec.describe ContentArtist, type: :model do
  describe 'validations' do
    it { should validate_presence_of(:name) }
    it { should validate_presence_of(:image) }
    it { should validate_presence_of(:description) }
    it { should validate_presence_of(:genre) }
    it { should validate_presence_of(:user_id) }
  end
end
