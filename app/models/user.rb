class User < ApplicationRecord
  attr_reader :password
  attr_accessor :session_token

  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :auth_token, presence: true
  validates :password, length: { minimum: 8, allow_nil: true }

  has_many :sessions, dependent: :destroy

  has_many :memberships, dependent: :destroy

  has_many :workspaces,
    foreign_key: :owner_id,
    dependent: :destroy

  has_many :teams, 
    through: :memberships,
    source: :membershipable,
    source_type: :Workspace

  has_many :joined_channels,
    through: :memberships,
    source: :membershipable,
    source_type: :Channel

  def joined_channel_ids_by_workspace
    workspace_hash = Hash.new { |h,k| h[k] = [] }
    
    joined_channels.each do |ch|
      workspace_hash[ch.workspace_id] << ch.id
    end
    
    workspace_hash
  end

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    return nil unless user
    user.is_password?(password) ? user : nil
  end

  def password=(password)
    @password = password
    self.auth_token = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.auth_token).is_password?(password)
  end
end
