class AddMessageToFeed < ActiveRecord::Migration[7.0]
  def change
    add_reference :feeds, :messages, null: false, foreign_key: true
  end
end
