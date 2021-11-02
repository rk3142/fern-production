require 'rails_helper'

RSpec.describe ProductController do

  describe 'GET all products without pagination' do
    it 'returns details of all the products without pagination' do
      get "index"
      expect(response.status).to eq(200)
      expect(response.content_type).to eq("application/json")
    end
  end

  describe 'GET all products with pagination' do
    it 'returns details of all the products with pagination' do
      get "index", params: {:limit => 10, :offset => 0}
      expect(response.status).to eq(200)
      expect(response.content_type).to eq("application/json")
    end
  end

  describe 'GET get_product_type_list' do
    it 'returns list of product_type' do
      get "all_product_types"
      expect(response.status).to eq(200)
      expect(response.content_type).to eq("application/json")
    end
  end
end
