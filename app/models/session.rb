class Session < ApplicationRecord
  validates :user_id, presence: true
  validates :session_token, presence: true, uniqueness: true
  
  belongs_to :user

  after_initialize :set_token

  def set_token
    self.session_token = SecureRandom.urlsafe_base64(32)
  end
end