require 'rails_helper'

RSpec.describe "Product Renderer", :type => :request do
  describe 'GET product_by_id' do
    it 'returns details of product by id' do
      product_id = "B097NN6PZC"
      get "/products/#{product_id}"
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
      target_type = 1
      get "/product_type/#{target_type}"
      expect(response.status).to eq(200)
      expect(response.content_type).to eq("application/json")
      parsed_json = JSON.parse(response.body)
      expect(parsed_json["products"].length).to eq(Product.where('product_type = ?',target_type).length)
    end
  end

  describe "GET user details" do
    user_id = ''
    before do
      idToken = generate_firebase_token "rk3142@columbia.edu"
      user_id = get_user_id_from_token idToken
      get "/user/#{user_id}", headers: {'idToken' => idToken}, session: {'user_id' => user_id}
    end

    it "has a 200 status code" do
      expect(response.status).to eq(200)
    end

    it "has json response body" do
      expect(response.content_type).to eq("application/json")
    end

    it "has user object in body" do
      json = JSON.parse(response.body)
      expect(json["user"]["user_id"]).to eql(user_id)
    end
  end

end
