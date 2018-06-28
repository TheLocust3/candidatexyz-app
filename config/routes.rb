Rails.application.routes.draw do
  root to: 'root#index'

  get '*path', to: 'root#index', :constraints => lambda{|req| req.path !~ /\.(css|min.css|min.js|jpeg|png|ico)$/ }
end
