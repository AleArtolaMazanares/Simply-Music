class CreateAlbums < ActiveRecord::Migration[7.0]
  def change
    create_table :albums do |t|
      t.string :name_album
      t.string :img
      t.text :description
      t.references :content_artists, null: false, foreign_key: true

      t.timestamps
    end
  end
end
