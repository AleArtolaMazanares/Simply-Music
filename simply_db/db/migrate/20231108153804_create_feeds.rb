class CreateFeeds < ActiveRecord::Migration[7.0]
  def change
    create_table :feeds do |t|
      t.references :artist, foreign_key: true
      t.string :content
      t.datetime :date

      t.timestamps
    end
  end
end
