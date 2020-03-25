module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      session_token = find_verified_session
      self.current_user = session_token.user
    end
 
    private
    def find_verified_session
      if verified_user = Session.find_by(session_token: session[:session_token])
        verified_user
      else
        reject_unauthorized_connection
      end
    end

    def session
      key = Rails.application.config.session_options.fetch(:key)
      cookies.encrypted[key]&.symbolize_keys || {}
    end
  end
end
