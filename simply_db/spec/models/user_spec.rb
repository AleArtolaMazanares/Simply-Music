require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'validations' do
    it { should validate_presence_of(:name_users) }
  end

  describe 'factories' do
    it 'has a valid factory for user' do
      user = FactoryBot.create(:user)
      expect(user).to be_valid
    end

    it 'has a valid factory for artist' do
      artist = FactoryBot.create(:user, :artist)
      expect(artist).to be_valid
      expect(artist.artist?).to eq(true)
    end
  end
end
