Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: "main#index"
  get '/products', to: 'product#index'
  get '/products/:product_id', to: 'product#show'
  get '/product_type', to: 'product#all_product_types'
  get '/product_type/:product_type', to: 'product#products_by_type'
end
