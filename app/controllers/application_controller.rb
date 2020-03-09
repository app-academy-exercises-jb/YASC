class ApplicationController < ActionController::Base
  helper_method :authenticated?
  skip_before_action :verify_authenticity_token

  def root
  end

  def current_user
    @current_user ||= session[:current_user] ?
        User.find(session[:current_user]["id"]) :
        nil
  end

  def current_user?
    !!current_user
  end

  def authenticated?
    if session[:session_token] && 
      Session.find_by(session_token: session[:session_token])&.user_id == current_user.id.to_s
        true
    else
      false
    end
  end

  def login!(user)
    puts "logged in"
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

  def require_authentication
    unless current_user?
      render json: {errors: "authentication required"}
    end
  end

  def enumerate_errors(entity)
    errs = {}
    entity.errors.each { |err| errs[err] = {entity.id => entity.errors.full_messages_for(err)} }
    errs
  end
end
