class Workspace < ApplicationRecord
  after_save :ensure_channels

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

  def ensure_channels
    debugger
    c1 = Channel.create!(name: "general", workspace_id: self.id, channel_type: "public")
    c2 = Channel.create!(name: "random", workspace_id: self.id, channel_type: "public")
    self.channels << [c1, c2]
    u = User.find(self.owner_id)
    [c1,c2].each do |c|
      c.users << u
    end
  end
end
