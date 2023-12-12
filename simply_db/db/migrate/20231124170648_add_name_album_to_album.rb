class AddNameAlbumToAlbum < ActiveRecord::Migration[7.0]
  def change
    add_column :albums, :name_album, :string
  end
end
