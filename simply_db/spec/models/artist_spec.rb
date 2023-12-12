# spec/models/artist_spec.rb
require 'rails_helper'

RSpec.describe Artist, type: :model do

  describe 'validations' do
    it { should validate_presence_of(:name_artist) }
    it { should validate_presence_of(:social) }
    it { should validate_presence_of(:description_artist) }
    it { should validate_presence_of(:tags) }
  end
end

