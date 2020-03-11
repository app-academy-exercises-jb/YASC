class Api::WorkspacesController < ApplicationController
  before_action :require_authentication
  before_action :set_workspace, only: [:show, :join, :leave, :boot, :channels, :destroy, :update]
  before_action :require_workspace_membership, only: [:boot, :leave]
  before_action :require_authorization, only: [:destroy, :update]

  # GET /workspaces/1/boot
  def boot
  end

  # GET /workspaces/1/counts
  def counts
      render json: { ok: true, current_user: current_user.id}
  end

  # POST /workspaces/1/members
  def join
    if current_user.teams << @workspace
      render :show, status: 200
    else
      render json: enumerate_errors(current_user), status: 400
    end
  end

  # DELETE /workspaces/1/members
  def leave
    current_user.teams.delete @workspace
    render json: { ok: true }, status: 200
  end

  # GET /workspaces/1
  # def show
  # end

  # PUT/PATCH /workspaces/1/update
  def update
    if @workspace.update(workspace_params)
      render :show, status: :ok
    else
      render json: enumerate_errors(@workspace), status: :unprocessable_entity
    end
  end

  # POST /workspaces
  def create
    @workspace = Workspace.new(workspace_params)
    @workspace.owner_id ||= current_user&.id

    if @workspace.save
      @current_user.teams << @workspace
      render :show, status: :created
    else
      render json: enumerate_errors(@workspace), status: :unprocessable_entity
    end
  end

  # DELETE /workspaces/1
  def destroy
    @workspace.destroy
    render json: { ok: true }, status: 200
  end

  private
    def require_workspace_membership
      unless @workspace.users.exists?(current_user.id)
        render json: {errors: "authorization required"}, status: :unauthorized
      end
    end
    
    # Require these actions to only be done by the owner of the workspace
    def require_authorization
      @workspace ||= Workspace.find(params[:id])
      unless current_user.id == @workspace.owner_id
        render json: {errors: "authorization required"}, status: :unauthorized
      end
    end

    # Use callbacks to share common setup or constraints between actions.
    def set_workspace
      @workspace ||= Workspace.find(params[:id])
      return @workspace if @workspace 
      render json: {errors: "workspace not found"}
    end

    # Only allow a list of trusted parameters through.
    def workspace_params
      params.require(:workspace).permit(:name)
    end
end
