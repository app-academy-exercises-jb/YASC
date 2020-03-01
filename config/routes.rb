Rails.application.routes.draw do
  resources :sessions
  root 'application#root'

  namespace :api, defaults: {format: :json} do
    resource :session, only: [:create, :destroy]
    resources :users
  end

  get '*path', to: 'application#root', contraints: lambda { |req| 
    !req.xhr? && req.format.html?
  }
end
