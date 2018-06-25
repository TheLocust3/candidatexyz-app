Rails.application.routes.draw do
  root to: 'root#index'

  get '*path', to: 'root#index', :constraints => lambda{|req| req.path !~ /\.(min.css|min.js|jpeg|png|ico)$/ }
end
