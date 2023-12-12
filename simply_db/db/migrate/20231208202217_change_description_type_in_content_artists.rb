class ChangeDescriptionTypeInContentArtists < ActiveRecord::Migration[7.0]
  def up
    change_column :content_artists, :description, :text, limit: 4294967295
  end

  def down
    change_column :content_artists, :description, :string
  end
end
