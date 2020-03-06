class Api::WorkspacesController < ApplicationController
  before_action :require_authentication
  before_action :set_workspace, only: [:show, :join, :leave, :destroy, :update]
  before_action :require_authorization, only: [:destroy, :update]

  # GET /workspaces/1/counts
  def counts
      render json: { ok: true, current_user: current_user.id}
  end

  # POST /workspaces/1/members
  def join
    if current_user.teams.exists?(id: @workspace.id)
      render json: { ok: false }, status: 400
    else
      current_user.teams << @workspace
      render :show, status: 200
    end
  end

  # DELETE /workspaces/1/members
  def leave
    if current_user.teams.exists?(id: @workspace.id)
      current_user.teams.delete @workspace
      render json: { ok: true }, status: 200
    else
      render json: { ok: false }, status: 400
    end
  end

  # GET /workspaces/1
  def show
  end

  # PUT/PATCH /workspaces/1/update
  def update
    if @workspace.update(workspace_params)
      render :show, status: :ok
    else
      render json: @workspace.errors, status: :unprocessable_entity
    end
  end

  # POST /workspaces
  def create
    @workspace = Workspace.new(workspace_params)
    @workspace.owner_id ||= current_user&.id

    begin
      if @workspace.save
        @current_user.teams << @workspace
        render :show, status: :created
      else
        errors = {}
        @workspace.errors.each { |err| errors[err] = @workspace.errors.full_messages_for(err) }
        render json: errors, status: :unprocessable_entity
      end
    rescue ActiveRecord::RecordNotUnique => error
      # @workspace.name += "-#{SecureRandom.urlsafe_base64(3)}"
      # @workspace.save
      # @current_user.teams << @workspace
      render json: {workspaces: "That workspace name has already been taken."}, status: :unprocessable_entity
    end
  end

  # DELETE /workspaces/1
  def destroy
    @workspace.destroy
    render json: { ok: true }, status: 200
  end

  private
    # Require these actions to only be done by the owner of the workspace
    def require_authorization
      @workspace ||= Workspace.find(params[:id])
      unless current_user.id == @workspace.owner_id
        render json: {errors: "authorization required"}, status: 400
      end
    end

    # Use callbacks to share common setup or constraints between actions.
    def set_workspace
      @workspace ||= Workspace.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def workspace_params
      params.require(:workspace).permit(:name)
    end
end
