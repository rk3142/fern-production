require 'rails_helper'

RSpec.describe ProductController do

  describe 'GET all products without pagination' do
    it 'returns details of all the products without pagination' do
      get "index"
      expect(response.status).to eq(200)
      expect(response.content_type).to eq("application/json")
      parsed_json = JSON.parse(response.body)
      # p parsed_json["products"]
      # p Product.all.length
      expect(parsed_json["products"].length).to eq(Product.all.length)
    end
  end

  describe 'GET all products with pagination' do
    it 'returns details of all the products with pagination' do
      limited_num_of_items = 5
      offset_of_items = 0
      get "index", :limit => limited_num_of_items, :offset => offset_of_items
      expect(response.status).to eq(200)
      expect(response.content_type).to eq("application/json")
      parsed_json = JSON.parse(response.body)
      expect(parsed_json["products"].length).to eq(limited_num_of_items)
    end
  end

  describe 'GET get_product_type_list' do
    it 'returns list of product_type' do
      get "all_product_types"
      expect(response.status).to eq(200)
      expect(response.content_type).to eq("application/json")
      parsed_json = JSON.parse(response.body)
      expect(parsed_json["product_types"].length).to eq(ProductType.all.length)
    end
  end
  
  describe 'GET product_by_id' do
    it 'returns details of product by id' do
      product_id = "B097NN6PZC"
      get :show, { :product_id =>product_id}
      expect(response.status).to eq(200)
      expect(response.content_type).to eq("application/json")
      parsed_json = JSON.parse(response.body)
#      parsed_json.each do |key, value|
#        puts "#{key}:#{value}"
#      end
      expect(parsed_json.length).to eq(Product.find_by_product_id(product_id).attribute_names.length+1)
    end
  end
  
  describe 'GET product by product type' do
    it 'returns list of products identifed by product id' do
      get :products_by_type, {:product_type => 1}
      expect(response.status).to eq(200)
      expect(response.content_type).to eq("application/json")
    end
  end
  
end
