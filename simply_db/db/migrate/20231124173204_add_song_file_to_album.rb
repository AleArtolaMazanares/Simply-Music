class AddSongFileToAlbum < ActiveRecord::Migration[7.0]
  def change
    add_column :albums, :song_file, :string
  end
end
