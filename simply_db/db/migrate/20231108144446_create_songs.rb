class CreateSongs < ActiveRecord::Migration[7.0]
  def change
    create_table :songs do |t|
      t.string :title_song
      t.string :song_file
      t.string :genre
      t.string :song_duration
      t.references :artist, foreign_key: true

      t.timestamps
    end
  end
end
