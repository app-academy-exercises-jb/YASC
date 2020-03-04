Rails.application.routes.draw do
  root 'application#root'

  namespace :api, defaults: {format: :json} do
    resource :session, only: [:create, :destroy]
    resources :users
    resources :workspaces
  end

  get '*path', to: 'application#root', contraints: lambda { |req| 
    !req.xhr? && req.format.html?
  }
end
