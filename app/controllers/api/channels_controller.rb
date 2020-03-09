class Api::ChannelsController < ApplicationController
  before_action :set_channel, only: [:show, :edit, :update, :destroy, :join, :leave]
  before_action :require_membership, only: [:show, :destroy, :update, :leave]

  # POST /channels/1/members
  def join
    if @channel.users << current_user
      render :show, status: 200
    else
      render json: enumerate_errors(@channel), status: 400
    end
  end

  # DELETE /channels/1/members
  def leave
    @channel.users.delete current_user
    render json: { ok: true }, status: 200
  end

  # GET /channels/1
  def show
  end

  # POST /channels
  def create
    @channel = Channel.new(channel_params)
    
    if @channel.save
      render :show, status: :created, location: @channel
    else
      render json: @channel.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /channels/1
  def update
    if @channel.update(channel_params)
      render :show, status: :ok, location: @channel
    else
      render json: @channel.errors, status: :unprocessable_entity
    end
  end

  # DELETE /channels/1
  def destroy
    @channel.destroy
    head :no_content
  end

  private
    def require_membership
      @channel ||= Channel.find(params[:id])
      unless @channel.users.includes(current_user)
        render json: {errors: "authorization required"}, status: :unauthorized
      end
    end

    # Use callbacks to share common setup or constraints between actions.
    def set_channel
      @channel = Channel.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def channel_params
      params.require(:channel).permit(:name, :workspace_id, :type)
    end
end
