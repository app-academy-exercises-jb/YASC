class CreateSessions < ActiveRecord::Migration[6.0]
  def change
    create_table :sessions do |t|
      t.string :user_id, null: false
      t.string :session_token, null: false
      t.timestamps
    end
    add_index :sessions, :session_token
  end
end
