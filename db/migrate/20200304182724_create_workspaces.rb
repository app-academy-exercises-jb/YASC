class CreateWorkspaces < ActiveRecord::Migration[6.0]
  def change
    create_table :workspaces do |t|
      t.string :name, 
        null: false,
        options: { index: { unique: true } }

      t.belongs_to :owner,
        foreign_key: {to_table: :users, through: :memberships}
        
      t.timestamps
    end
  end
end
