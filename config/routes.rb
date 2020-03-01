Rails.application.routes.draw do
  root 'application#root'

  namespace :api, defaults: {format: :json} do
    resources :sessions, only: [:create, :destroy]
    resources :users
  end

  get '*path', to: 'application#index', contraints: lambda { |req| 
    !req.xhr? && req.format.html?
  }
end
