class User < ApplicationRecord
  attr_reader :password
  attr_accessor :session_token

  validates :email, presence: true, uniqueness: true
  validates :auth_token, presence: true
  validates :password, length: { minimum: 8, allow_nil: true }

  has_many :sessions

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
