class AddUserToContentArtist < ActiveRecord::Migration[7.0]
  def change
    add_reference :content_artists, :user, null: false, foreign_key: { on_delete: :cascade }
  end
end
