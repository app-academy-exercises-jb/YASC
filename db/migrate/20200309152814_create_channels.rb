class CreateChannels < ActiveRecord::Migration[6.0]
  def change
    create_table :channels do |t|
      t.string :name, null: false
      t.references :workspace, index: false, foreign_key: true
      t.string :channel_type
      t.timestamps
    end
    add_index :channels, [:workspace_id, :name], unique: true
    add_index :channels, :name
  end
end
