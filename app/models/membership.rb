class Membership < ApplicationRecord
  belongs_to :membershipable, polymorphic: true
  belongs_to :user

  validates :user,
    presence: true

  validates :membershipable_id,
    uniqueness: { scope: [:user_id, :membershipable_type] }
end
