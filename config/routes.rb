Rails.application.routes.draw do
  root to: 'root#index'

  namespace :api do
    namespace :users do
      get '' => 'users#index'
    end
  end

  get '*path', to: 'root#index'
end
