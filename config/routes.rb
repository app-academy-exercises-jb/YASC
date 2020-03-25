Rails.application.routes.draw do
  root 'application#root'

  namespace :api, defaults: {format: :json} do
    resource :session, only: [:create, :destroy, :update]
    
    resources :users, only: [:create, :show, :update]
    namespace :users do
      get ':id/teams', action: 'teams'
    end

    resources :workspaces, only: [:create, :destroy, :update]
    namespace :workspaces do
      get ':id/boot', action: 'boot'
      get ':id/counts', action: 'counts'
      post ':id/members', action: 'join'
      delete ':id/members', action: 'leave'
    end

    resources :channels, only: [:show, :create, :destroy, :update]
    namespace :channels do
      post ':id/members', action: 'join'
      delete ':id/members', action: 'leave'
      get ':id/counts', action: 'counts'
    end
  end

  get '*path', to: 'application#root', contraints: lambda { |req| 
    !req.xhr? && req.format.html?
  }
end
