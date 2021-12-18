require 'rails_helper'

RSpec.describe BookmarksController do
  idToken = ""
  user_id = ""
  before(:context) do
    idToken = generate_firebase_token "rk3142@columbia.edu"
    user_id = get_user_id_from_token idToken
  end

  describe 'POST add a product to bookmark' do

    # idToken = generate_firebase_token "rk3142@columbia.edu"
    # user_id = get_user_id_from_token idToken


    product_id = "B097NN6PZC"
    difference = 1
    initial_count = UserFavorite.count
    before do
      session[:user_id] = user_id
      request.headers[:idToken]= idToken
      post :create, {:product_id => product_id}
    end

    it 'returns a http_status code as 201' do
      expect(response.status).to eq(201)
    end

    it 'Count of table increases by 1' do
      final_count = UserFavorite.count
      expect(final_count - initial_count).to eq(difference)
    end
  end

  describe 'POST add a product to bookmark when the product is already added(Exception flow)' do

    # idToken = generate_firebase_token "rk3142@columbia.edu"
    # user_id = get_user_id_from_token idToken
    product_id = "B097NN6PZC"
    difference = 1
    initial_count = UserFavorite.count
    before do
      session[:user_id] = user_id
      request.headers[:idToken]= idToken
      post :create, {:product_id => product_id}
      post :create, {:product_id => product_id}
    end

    it 'returns a http_status code as 201' do
      expect(response.status).to eq(201)
    end

    it 'Count of table increase by 1' do
      expect(difference).to eq(UserFavorite.where(:user_id => user_id).count)
    end
  end

  describe 'POST add product to bookmark product_id missing' do

    # idToken = generate_firebase_token "rk3142@columbia.edu"
    # user_id = get_user_id_from_token idToken
    product_id = "ssss"

    before do
      session[:user_id] = user_id
      request.headers[:idToken]= idToken
      post :create, {product_id: product_id}
    end

    it 'returns a http_status code as 400' do
      expect(response.status).to eq(400)
    end

  end

  describe 'GET the list of products added to bookmark' do

    # idToken = generate_firebase_token "rk3142@columbia.edu"
    # user_id = get_user_id_from_token idToken
    product_id = "B097NN6PZC"
    before do
      session[:user_id] = user_id
      request.headers[:idToken]= idToken
      post :create, {:product_id => product_id}
      get :show
    end

    it 'returns a http_status code as 200' do
      expect(response.status).to eq(200)
    end

    it 'returns a json response' do
      expect(response.content_type).to eq("application/json")
    end

    it 'returns all the data available in bookmark table' do
      parsed_json = JSON.parse(response.body)
      expect(parsed_json["products"].length).to eq(UserFavorite.where(:user_id => user_id).count)
    end

    it 'response has an element is_bookmared_value as 1' do
      parsed_json = JSON.parse(response.body)
      expect(parsed_json["products"][0]["is_bookmarked"]).to equal(1)
    end
  end

  describe 'DELETE remove a product from bookmark' do

    # idToken = generate_firebase_token "rk3142@columbia.edu"
    # user_id = get_user_id_from_token idToken
    product_id = "B097NN6PZC"
    difference = 1
    initial_count = 0
    before do
      session[:user_id] = user_id
      request.headers[:idToken]= idToken
      post :create, {:product_id => product_id}
      initial_count = UserFavorite.where(:user_id => user_id).count
      delete :destroy, {:product_id => product_id}
    end

    it 'returns a http_status code as 204' do
      expect(response.status).to eq(204)
    end

    it 'it decreases the size of table by 1' do
      final_count = UserFavorite.where(:user_id => user_id).count
      expect(initial_count - final_count).to eq(difference)
    end
  end

  describe 'DELETE remove a product from bookmark, product_id missing' do

    # idToken = generate_firebase_token "rk3142@columbia.edu"
    # user_id = get_user_id_from_token idToken
    product_id = "ssss"
    before do
      session[:user_id] = user_id
      request.headers[:idToken]= idToken
      delete :destroy, {product_id: product_id}
    end

    it 'returns a http_status code as 400' do
      expect(response.status).to eq(400)
    end

  end

end
