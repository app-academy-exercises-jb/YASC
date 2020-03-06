class Workspace < ApplicationRecord
  validates :owner_id, presence: true
  validates :name, presence: true, allow_blank: false

  belongs_to :owner, 
    class_name: :User
  has_many :memberships, as: :membershipable
  has_many :users, through: :memberships, source: :user, dependent: :destroy
end
