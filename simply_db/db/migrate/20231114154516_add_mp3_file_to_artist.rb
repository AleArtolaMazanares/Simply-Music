class AddMp3FileToArtist < ActiveRecord::Migration[7.0]
  def change
    add_column :artists, :mp3_file, :string
  end
end
