class Message < ApplicationRecord
  has_many :memberships,
    as: :membershipable,
    dependent: :destroy

  has_many :users,
    through: :memberships,
    source: :user,
    dependent: :destroy

  has_many :replies,
    -> { where.not(parent_message_id: nil) },
    class_name: :Message,
    foreign_key: :parent_message_id,
    dependent: :destroy

  belongs_to :parent_message,
    class_name: :Message,
    optional: true

  belongs_to :author,
    class_name: :User

  belongs_to :channel

  validates :body, presence: true
  validates :author, presence: true
  validates :channel, presence: true
  validates :parent_message, presence: true, unless: -> { parent_message_id.nil? }
end
