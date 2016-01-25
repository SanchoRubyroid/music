Rails.application.routes.draw do
  root to: 'player#index'

  get 'visitors', to: 'visitors#index'
end
