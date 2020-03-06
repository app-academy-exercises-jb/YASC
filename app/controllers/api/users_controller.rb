class Api::UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit, :update, :destroy, :workspaces]

  # GET /users
  def index
  end

  # GET /users/1
  def show
    @user.session_token = session[:session_token]
  end

  # GET /users/new
  def new
  end

  # GET /users/1/edit
  def edit
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
  end

  # DELETE /users/1
  def destroy
  end

  # GET users/1/workspaces
  def workspaces
  end

  private
    def set_user
      @user = User.find(params[:id])
    end

    def user_params
      params.require(:user).permit(:email, :password)
    end
end
