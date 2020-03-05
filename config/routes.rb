Rails.application.routes.draw do
  root 'application#root'

  namespace :api, defaults: {format: :json} do
    resource :session, only: [:create, :destroy]
    resources :users, only: [:create, :show]
    resources :workspaces, only: [:show, :create, :destroy, :update]
    namespace :workspaces do
      get ':id/counts', action: 'counts'
      post ':id/members', action: 'join'
      delete ':id/members', action: 'leave'
    end
  end

  get '*path', to: 'application#root', contraints: lambda { |req| 
    !req.xhr? && req.format.html?
  }
end
