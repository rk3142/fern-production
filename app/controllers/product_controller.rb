class ProductController < ApplicationController
  include ProductHelper

  def index
    resp = Hash.new
    products = Product.all.limit(get_limit_value(params[:limit])).offset(get_offset_value(params[:offset]))
    product_list = []
    if products.present?
      products.each do |product|
        product_list.push(ProductHelper.get_product_list(product))
      end
    end
    resp[:products] = product_list
    render json: resp, status: 200
  end

  def show
    product = Product.find_by_product_id params[:product_id]
    product_resp = Hash.new
    if product.present?
      product_resp = ProductHelper.get_product_list product
    end
    render json: product_resp, status: 200
  end

  def all_product_types
    @product_type = ProductType.all
    resp = Hash.new
    resp['product_types'] = @product_type
    render json: resp, status: 200
  end

  def products_by_type
    products = Product.find_all_by_product_type(params[:product_type])
    product_list = []
    resp = Hash.new
    if products.present?
      products.each do |product|
        product_list.push(ProductHelper.get_product_list product)
      end
    end
    resp[:products] = product_list
    render json: resp, status: 200
  end

end
