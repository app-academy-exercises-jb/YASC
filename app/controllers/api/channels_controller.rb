class Api::ChannelsController < ApplicationController
  before_action :require_authentication
  before_action :set_channel, only: [:show, :edit, :update, :destroy, :join, :leave, :counts]
  # before_action :require_channel_membership, only: [:show, :destroy, :update, :leave]
  before_action :require_workspace_membership, only: [:join]

  # POST /channels/1/members
  def join
    if @channel.users.exists?(current_user.id)
      render json: {channel_members: "User is already a member of this channel"}, status: 400
    else
      @channel.users << current_user
      render :show, status: 200
    end
  end

  # DELETE /channels/1/members
  def leave
    @channel.users.delete current_user
    render json: {}, status: :ok
  end

  # GET /channels/1/counts
  def counts
  end

  # GET /channels/1
  def show
  end

  # POST /channels
  def create
    @channel = Channel.new(channel_params)
    
    if @channel.save
      @channel.users << current_user
      render :show, status: :created
    else
      errors = {}
      @channel.errors.each { |err| errors[err] = @channel.errors.full_messages_for(err) }
      render json: errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /channels/1
  def update
    if @channel.update(channel_params)
      render :show, status: :ok
    else
      render json: enumerate_errors(@channel), status: :unprocessable_entity
    end
  end

  # DELETE /channels/1
  def destroy
    @channel.destroy
    render json: {}, status: :ok
  end

  private
    def require_channel_membership
      unless @channel.users.exists?(current_user.id)
        render json: {errors: "Authorization Required. User is not a member of channel"}, status: :unauthorized
      end
    end

    def require_workspace_membership
      unless @channel.workspace.users.exists?(current_user.id)
        render json: {errors: "User is not a member of workspace"}, status: :unauthorized
      end
    end

    # Use callbacks to share common setup or constraints between actions.
    def set_channel
      @channel = Channel.find_by(id: params[:id])
      return @channel if @channel 
      render json: {errors: "channel not found"}
    end

    # Only allow a list of trusted parameters through.
    def channel_params
      params.require(:channel).permit(:name, :workspace_id, :channel_type)
    end
end
