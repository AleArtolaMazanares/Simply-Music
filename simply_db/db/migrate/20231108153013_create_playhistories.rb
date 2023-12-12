class CreatePlayhistories < ActiveRecord::Migration[7.0]
  def change
    create_table :playhistories do |t|
      t.references :user, foreign_key: true
      t.references :song, foreign_key: true
      t.datetime :date

      t.timestamps
    end
  end
end
