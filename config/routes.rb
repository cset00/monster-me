Rails.application.routes.draw do
  resources :users
  resources :uploads
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root 'home#index'
  # add something to link to uploads here
  get '/upload', to: 'uploads#index'
  
end
