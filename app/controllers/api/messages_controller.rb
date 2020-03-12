class Api::MessagesController < ApplicationController
  before_action :require_authentication
  before_action :set_channel
  before_action :set_message, only: [:update, :destroy]

  # GET /messages
  def index
    @messages = @channel.messages
  end

  # # GET /messages/1
  # def show
  # end

  # POST /messages
  def create
    @message = Message.new(message_params)
    # require authentication + channel membership
    @message.author_id = @current_user.id;
    @message.channel_id = @channel.id;

    if @message.save
      render :show, status: :created
    else
      errors = {}
      @message.errors.each { |err| errors[err] = @message.errors.full_messages_for(err) }
      render json: errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /messages/1
  def update
    if @message.update(message_params)
      render :show, status: :ok, location: @message
    else
      render json: @message.errors, status: :unprocessable_entity
    end
  end

  # DELETE /messages/1
  def destroy
    @message.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_message
      @message = Message.find_by(id: params[:id])
      return @message if @message
      render json: {errors: "message not found"}
    end

    def set_channel
      @channel = Channel.find_by(id: params[:channel_id])
      return @channel if @channel 
      render json: {errors: "channel not found"}
    end

    # Only allow a list of trusted parameters through.
    def message_params
      params.require(:message).permit(:body)
    end
end
