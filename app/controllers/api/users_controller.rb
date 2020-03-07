class Api::UsersController < ApplicationController
  before_action :set_user, only: [:show, :update, :destroy, :teams]

# GET /users/1
  def show
    @user.session_token = session[:session_token]
  end

# POST /users
  def create
    @user = User.new(user_params)

    if @user.save
      login!(@user)
      render :show, status: :created
    else
      errors = {}
      @user.errors.each { |err| errors[err] = @user.errors.full_messages_for(err) }
      render json: errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users/1
  def update
    user = User.find_by_credentials(user_params[:email], user_params[:password])
    if user.nil? || user.id != @user.id
      render json: {login: 'Incorrect password.'}, 
        status: :unauthorized
    else
      if user_params[:new_email]
        if @user.update(email: user_params[:new_email])
          session[:current_user] = {
            id: @user.id,
            email: @user.email,
            session_token: session[:session_token]
          }
          render :show
        else
          errors = {}
          @user.errors.each { |err| errors[err] = user.errors.full_messages_for(err) }
          render json: errors, status: :unprocessable_entity
        end
      elsif user_params[:new_password]
        if @user.update(auth_token: BCrypt::Password.create(user_params[:new_password]))
          render :show
        else
          errors = {}
          @user.errors.each { |err| errors[err] = user.errors.full_messages_for(err) }
          render json: errors, status: :unprocessable_entity
        end
      end
    end
  end

  # GET users/1/teams
  def teams
  end

  private
    def set_user
      @user = User.find(params[:id])
    end

    def user_params
      params.require(:user).permit(:email, :password, :new_password, :new_email)
    end
end
