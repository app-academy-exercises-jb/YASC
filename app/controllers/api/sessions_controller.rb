class Api::SessionsController < ApplicationController
  skip_before_action :verify_authenticity_token
  def create
    @user = User.find_by_credentials(user_params[:email], user_params[:password])
    if @user.nil?
      render json: {login: 'incorrect credentials'}, status: 401
    else
      login!(@user)
      redirect_to api_user_url(@user), status: :found
    end
  end

  def destroy
    @session = Session.find_by(session_token: session_params)
    if @session 
      @session.destroy!
      render json: {}
    else
      render json: ["session not found"], status: 404
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