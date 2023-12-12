class AddContentArtistToSong < ActiveRecord::Migration[7.0]
  def change
    add_reference :songs, :content_artist, null: false, foreign_key: true
  end
end
