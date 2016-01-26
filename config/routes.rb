Rails.application.routes.draw do
  root to: 'player#index'

  get 'download', to: 'player#download'
end
