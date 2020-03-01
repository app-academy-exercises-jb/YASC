class ApplicationController < ActionController::Base
  def root
  end

  def login!(user)
    @session = Session.new(user_id: user.id)
    if @session.save
      user.session_token = @session.session_token
      session[:session_token] = @session.session_token
      session[:current_user] = {
        id: user.id,
        email: user.email,
        session_token: user.session_token
      }
    end
  end
end
