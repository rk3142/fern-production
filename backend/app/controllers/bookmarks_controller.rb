class BookmarksController < ApplicationController
  before_action :require_login
  #before_action :set_session_id_if_empty

  def create
    Rails.logger.info "Proceeding to process API: add_new_bookmark"
    product_id = params[:product_id]
    if Product.exists?(:product_id => product_id)
      begin
        user_id = session[:user_id]
        favorite = UserFavorite.new
        favorite.user_id = user_id
        favorite.product_id = product_id
        favorite.save!
      rescue ActiveRecord::RecordNotUnique
        Rails.logger.error "Record Not Unique"
      end
      render :nothing => true, status: 201
    else
      Rails.logger.error "Product_id not found"
      resp = Hash.new
      resp[:msg] = "Product_id not found"
      render :json => resp, status: 400
    end
  end

  def show
    resp = Hash.new
    bookmarked_products = BookmarksHelper.get_bookmarked_products(session[:user_id])
    products = Product.find_by_product_ids bookmarked_products
    product_list = []
    if products.present?
      products.each do |product|
        product_list.push(ProductHelper.get_product_list(product, 1))
      end
    end
    resp[:products] = product_list
    Rails.logger.info "Response sent to client #{resp.inspect}"
    render json: resp, status: 200
  end

  def destroy
    Rails.logger.info "Proceeding to process API: delete_bookmark"

    unless Product.exists?(:product_id => params[:product_id])
      resp = Hash.new
      resp[:error_msg] = "Product id not valid"
      render json: resp, status: :bad_request
    else
      UserFavorite.delete_by_user_id_and_product_id(session[:user_id], params[:product_id])
      render :nothing => true, status: :no_content
    end
  end
end
