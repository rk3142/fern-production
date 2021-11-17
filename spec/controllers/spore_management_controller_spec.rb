require 'rails_helper'

RSpec.describe SporeManagementController do

  describe 'GET all products without pagination' do

    idToken = generate_firebase_token "rk3142@columbia.edu"
    user_id = get_user_id_from_token idToken
    before do
      session[:user_id] = user_id
      request.headers[:idToken]= idToken
      get "index"
    end

    it 'returns a http_status code as 200' do
      expect(response.status).to eq(200)
    end

    it 'returns a json response' do
      expect(response.content_type).to eq("application/json")
    end

    it 'returns all the data available in product table' do
      parsed_json = JSON.parse(response.body)
      expect(parsed_json["products"].length).to eq(Product.all.length)
    end

    it 'response has an element water which returns water consumed' do
      parsed_json = JSON.parse(response.body)
      expect(parsed_json["products"][0]).to include("water")
    end

    it 'response has an element carbon which returns carbon consumed' do
      parsed_json = JSON.parse(response.body)
      expect(parsed_json["products"][0]).to include("carbon")
    end

    it 'response has an element energy which returns energy consumed' do
      parsed_json = JSON.parse(response.body)
      expect(parsed_json["products"][0]).to include("energy")
    end
  end
end
