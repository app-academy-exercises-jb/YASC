class Workspace < ApplicationRecord
  belongs_to :owner, 
    class_name: :User
  has_many :memberships, as: :membershipable, dependent: :destroy
  has_many :users, through: :memberships, source: :user

end
