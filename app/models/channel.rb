class Channel < ApplicationRecord
  has_many :memberships, as: :membershipable
  has_many :users, through: :memberships, source: :user, dependent: :destroy
  has_many :messages, dependent: :destroy

  belongs_to :workspace

  validates :name, presence: true, allow_blank: false, uniqueness: { scope: :workspace }
  validates :workspace, presence: true
  validates :channel_type, presence: true, inclusion: { in: ["public", "private", "direct"] }

  def member_count
    self.users.size
  end
end
