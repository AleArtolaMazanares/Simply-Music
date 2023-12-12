class CreateMessages < ActiveRecord::Migration[7.0]
  def change
    create_table :messages do |t|
      t.string :message_content
      t.string :sent_hour
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
