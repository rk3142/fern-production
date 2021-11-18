Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  #root to: "main#index"
  get '/products', to: 'product#index'
  get '/products/:product_id', to: 'product#show'
  get '/product_type', to: 'product#all_product_types'
  get '/product_type/:product_type', to: 'product#products_by_type'
  post '/user/signup', to: 'user#new'
  post '/user/signin', to: 'user#login'
  get '/user/:user_id', to: 'user#show'
  get '/bookmarks', to: 'bookmarks#show'
  post '/bookmarks/:product_id', to: 'bookmarks#create'
  delete '/bookmarks/:product_id', to: 'bookmarks#destroy'
  delete '/user/logout', to: 'session#destroy'
  put '/spores/claim', to: 'spore_management#claim_spores'
  put '/spores/redeem', to: 'spore_management#redeem_spores'
  get '/spores/history', to: 'spore_management#show_history'
  get '/spores/current', to: 'spore_management#show_current_balance'
  get '/spores/milestones', to: 'spore_management#get_milestones'
  get '/product/search', to: 'product#search_products'
  get '/product/similar', to: 'product#similar_products'
  root :controller => 'static', :action => '/'
end
