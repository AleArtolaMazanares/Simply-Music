class CreateContentArtists < ActiveRecord::Migration[7.0]
  def change
    create_table :content_artists do |t|
      t.string :name
      t.string :image
      t.string :description
      t.string :genre
      t.references :song, foreign_key: true


      t.timestamps
    end
  end
end
