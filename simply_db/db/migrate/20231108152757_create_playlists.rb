class CreatePlaylists < ActiveRecord::Migration[7.0]
  def change
    create_table :playlists do |t|
      t.string :name_playlist
      t.string :description_playlist
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
