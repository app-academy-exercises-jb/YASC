Rails.application.routes.draw do
  root 'application#root'
  mount ActionCable.server => '/cable'

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

    resources :channels, only: [:create, :destroy, :update] do
      post 'members', action: 'join'
      delete 'members', action: 'leave'
      get 'counts', action: 'counts'

      resources :messages, only: [:index, :create, :destroy, :update]
    end
    # namespace :channels do
    #   # get ':id/messages', action: 'show'
    #   # post ':id/messages', action: 'post_message'

    # end
  end

  get '*path', to: 'application#root', contraints: lambda { |req| 
    !req.xhr? && req.format.html?
  }
end
