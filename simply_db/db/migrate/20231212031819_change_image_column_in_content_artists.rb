class ChangeImageColumnInContentArtists < ActiveRecord::Migration[7.0]
  def change
    change_column :content_artists, :image, :binary, limit: 10.megabytes # Ajusta según tus necesidades
  end
end
