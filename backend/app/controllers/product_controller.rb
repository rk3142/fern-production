class ProductController < ApplicationController

  before_action :require_login

  def index
    resp = Hash.new
    Rails.logger.info "Proceeding to process API: get_all_products"
    bookmarked_products = BookmarksHelper.get_bookmarked_products(session[:user_id])
    products = Product.all.limit(get_limit_value(params[:limit])).offset(get_offset_value(params[:offset]))
    product_list = []
    if products.present?
      products.each do |product|
        is_bookmarked = BookmarksHelper.is_bookmarked?(product.product_id, bookmarked_products)
        product_list.push(ProductHelper.get_product_list(product, is_bookmarked))
      end
    end
    resp[:products] = product_list
    Rails.logger.info "Response sent to client #{resp.inspect}"
    render json: resp, status: 200
  end

  def show
    Rails.logger.info "Proceeding to process API: get_product_by_id for product id #{params[:product_id]}"
    bookmarked_products = BookmarksHelper.get_bookmarked_products(session[:user_id])
    product = Product.find_by_product_id params[:product_id]
    product_resp = Hash.new
    if product.present?
      is_bookmarked = BookmarksHelper.is_bookmarked?(product.product_id, bookmarked_products)
      product_resp = ProductHelper.get_product_list product, is_bookmarked
    end
    render json: product_resp, status: 200
  end

  def all_product_types
    resp = Hash.new
    Rails.logger.info "Proceeding to process API: all_product_types"
    @product_type = ProductType.all
    resp['product_types'] = @product_type
    render json: resp, status: 200
  end


  def products_by_type
    resp = Hash.new
    Rails.logger.info "Proceeding to process API: get_products_by_type"
    products = Product.find_all_by_product_type(params[:product_type])
    bookmarked_products = BookmarksHelper.get_bookmarked_products(session[:user_id])
    product_list = []
    if products.present?
      products.each do |product|
        is_bookmarked = BookmarksHelper.is_bookmarked?(product.product_id, bookmarked_products)
        product_list.push(ProductHelper.get_product_list product, is_bookmarked)
      end
    end
    resp[:products] = product_list
    render json: resp, status: 200
  end

  def search_products
    resp = Hash.new
    Rails.logger.info "Proceeding to process API: search product"
    search_key = params[:search_key]
    bookmarked_products = BookmarksHelper.get_bookmarked_products(session[:user_id])
    products = Product.get_products_by_title(search_key)
    product_list = []
    if products.present?
      products.each do |product|
        is_bookmarked = BookmarksHelper.is_bookmarked?(product.product_id, bookmarked_products)
        product_list.push(ProductHelper.get_product_list(product))
      end
    end
    resp[:products] = product_list
    Rails.logger.info "Response sent to client #{resp.inspect}"
    render json: resp, status: 200
  end

  def similar_products
    resp = Hash.new
    Rails.logger.info "Proceeding to process API: similar_products"
    bookmarked_products = BookmarksHelper.get_bookmarked_products(session[:user_id])
    if Product.exists?(:product_id => params[:product_id])
      products = Product.get_random_products(5, params[:product_id])
      product_list = []
      if products.present?
        products.each do |product|
          is_bookmarked = BookmarksHelper.is_bookmarked?(product.product_id, bookmarked_products)
          product_list.push(ProductHelper.get_product_list(product))
        end
      end
    end
    resp[:products] = product_list
    Rails.logger.info "Response sent to client #{resp.inspect}"
    render json: resp, status: :ok
  end

end
