require 'rails_helper'

RSpec.describe "Product Renderer", :type => :request do
  describe 'GET product_by_id' do
    it 'returns details of product by id' do
      product_id = "B097NN6PZC"
      get "/products/#{product_id}"
      expect(response.status).to eq(200)
      expect(response.content_type).to eq("application/json")
      api_response = JSON.parse(response.body)
    end
  end

  describe 'GET product by product type' do
    it 'returns list of products identifed by product id' do
      get "/product_type/1"
      expect(response.status).to eq(200)
      expect(response.content_type).to eq("application/json")
    end
  end
end