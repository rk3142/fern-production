class ProductController < ApplicationController
  include ProductHelper

  before_action :require_login

  def index
    resp = Hash.new
    Rails.logger.info "Proceeding to process API: get_all_products"
    products = Product.all.limit(get_limit_value(params[:limit])).offset(get_offset_value(params[:offset]))
    product_list = []
    if products.present?
      products.each do |product|
        product_list.push(ProductHelper.get_product_list(product))
      end
    end
    resp[:products] = product_list
    Rails.logger.info "Response sent to client #{resp.inspect}"
    render json: resp, status: 200
  end

  def show
    Rails.logger.info "Proceeding to process API: get_product_by_id for product id #{params[:product_id]}"
    product = Product.find_by_product_id params[:product_id]
    product_resp = Hash.new
    if product.present?
      product_resp = ProductHelper.get_product_list product
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
    product_list = []
    if products.present?
      products.each do |product|
        product_list.push(ProductHelper.get_product_list product)
      end
    end
    resp[:products] = product_list
    render json: resp, status: 200
  end

end
