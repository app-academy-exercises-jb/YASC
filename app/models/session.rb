class Session < ApplicationRecord
  validates :user_id, presence: true
  validates :session_token, presence: true, uniqueness: true
  
  belongs_to :user

  after_initialize :set_token

  def set_token
    self.session_token = SecureRandom.urlsafe_base64(32)
  end

  def flush
    Session.where(user_id: self.user_id).where.not(id: self.id).delete_all
  end
end