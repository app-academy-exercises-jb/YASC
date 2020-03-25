class Membership < ApplicationRecord
  belongs_to :membershipable, polymorphic: true
  belongs_to :user
end
