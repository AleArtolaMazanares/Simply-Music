class AddContentArtistToComment < ActiveRecord::Migration[7.0]
  def change
    add_reference :comments, :content_artist, null: false, foreign_key: true
  end
end
