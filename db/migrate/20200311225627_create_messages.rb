class CreateMessages < ActiveRecord::Migration[6.0]
  def change
    create_table :messages do |t|
      t.text :body, null: false

      t.belongs_to :author,
        foreign_key: { to_table: :users }
      
      t.references :channel,
        foreign_key: true,
        null: false
      
      t.belongs_to :parent_message
      
      t.timestamps
    end
  end
end
