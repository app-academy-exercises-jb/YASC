class Api::SessionsController < ApplicationController  
  def create
    @user = User.find_by_credentials(user_params[:email], user_params[:password])
    if @user.nil?
      render json: {login: 'You have entered an incorrect email or password.'}, 
        status: :unauthorized
    else
      login!(@user)
      redirect_to api_user_url(@user), status: :found
    end
  end

  def destroy
    @session = Session.find_by(session_token: session_params)
    if @session 
      @session.destroy!
      render json: { ok: true }
    else
      render json: { ok: false, error: "session not found" }, status: :not_found
    end
  end

  def update
    @session = Session.find_by(session_token: session_params)
    if @session
      @session.flush
      render json: { ok: true }
    else
      render json: { ok: false, error: "session not found" }, status: :not_found
    end
  end

  private
  def session_params
    params.require(:session).permit(:session_token)[:session_token]
  end
  def user_params
    params.require(:user).permit(:email, :password)
  end
end