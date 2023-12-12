class AddContentArtistToMessage < ActiveRecord::Migration[7.0]
  def change
    add_reference :messages, :content_artist, null: false, foreign_key: { on_delete: :cascade }
  end
end
