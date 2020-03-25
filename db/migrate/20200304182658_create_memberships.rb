class CreateMemberships < ActiveRecord::Migration[6.0]
  def change
    create_table :memberships do |t|
      t.belongs_to :user,
        foreign_key: true,
        null: false

      t.references :membershipable, polymorphic: true, null: false
      t.timestamps
    end

    add_index :memberships, 
      [:user_id, :membershipable_type, :membershipable_id], 
      unique: true,
      name: 'by_unique_membership_type'
  end
end
