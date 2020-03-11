class Workspace < ApplicationRecord
  has_many :channels,
    dependent: :destroy

  belongs_to :owner, 
    class_name: :User
  
  has_many :memberships,
    as: :membershipable,
    dependent: :destroy
  
  has_many :users,
    through: :memberships,
    source: :user,
    dependent: :destroy

  validates :owner_id,
    presence: true

  validates :name,
    presence: true,
    allow_blank: false,
    uniqueness: true
end
