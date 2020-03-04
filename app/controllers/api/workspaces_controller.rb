class WorkspacesController < ApplicationController
  before_action :set_workspace, only: [:show, :edit, :update, :destroy]

  # GET /workspaces
  def index
  end

  # GET /workspaces/1
  def show
  end

  # GET /workspaces/new
  def new
  end

  # GET /workspaces/1/edit
  def edit
  end

  # POST /workspaces
  def create
    @workspace = Workspace.new(workspace_params)

    if @workspace.save
      render :show, status: :created, location: @workspace
    else
      render json: @workspace.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /workspaces/1
  # PATCH/PUT /workspaces/1.json
  def update
    if @workspace.update(workspace_params)
      render :show, status: :ok, location: @workspace
    else
      render json: @workspace.errors, status: :unprocessable_entity
    end
  end

  # DELETE /workspaces/1
  # DELETE /workspaces/1.json
  def destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_workspace
      @workspace = Workspace.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def workspace_params
      params.fetch(:workspace, {})
    end
end
