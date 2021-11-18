require 'rails_helper'

RSpec.describe ProductController do

  idToken = ""
  user_id = ""
  before(:context) do
    idToken = generate_firebase_token "rk3142@columbia.edu"
    user_id = get_user_id_from_token idToken
  end

  describe 'GET all products without pagination' do

    # idToken = generate_firebase_token "rk3142@columbia.edu"
    # user_id = get_user_id_from_token idToken
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

  describe 'GET all products with pagination' do
    # idToken = generate_firebase_token "rk3142@columbia.edu"
    # user_id = get_user_id_from_token idToken
    limited_num_of_items = 5
    before do
      offset_of_items = 0
      session[:user_id] = user_id
      request.headers[:idToken]= idToken
      get "index", :limit => limited_num_of_items, :offset => offset_of_items
    end

    it 'returns a http_status code as 200' do
      expect(response.status).to eq(200)
    end

    it 'returns a json response' do
      expect(response.content_type).to eq("application/json")
    end

    it 'returns all the data available in product table' do
      parsed_json = JSON.parse(response.body)
      expect(parsed_json["products"].length).to eq(limited_num_of_items)
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

  describe 'GET get_product_type_list' do
    # idToken = generate_firebase_token "rk3142@columbia.edu"
    # user_id = get_user_id_from_token idToken
    before do
      session[:user_id] = user_id
      request.headers[:idToken]= idToken
      get "all_product_types"
    end

    it 'returns a http_status code as 200' do
      expect(response.status).to eq(200)
    end

    it 'returns a json response' do
      expect(response.content_type).to eq("application/json")
    end

    it 'returns list of product_type present in database' do
      parsed_json = JSON.parse(response.body)
      expect(parsed_json["product_types"].length).to eq(ProductType.all.length)
    end
  end
  
  describe 'GET product_by_id' do
    product_id = "B097NN6PZC"
    # idToken = generate_firebase_token "rk3142@columbia.edu"
    # user_id = get_user_id_from_token idToken
    before do
      session[:user_id] = user_id
      request.headers[:idToken]= idToken
      get :show, { :product_id => product_id}
    end

    it 'returns a http_status code as 200' do
      expect(response.status).to eq(200)
    end

    it 'returns a json response' do
      expect(response.content_type).to eq("application/json")
    end

    it "returns details of product requested" do
      json = JSON.parse(response.body)
      expect(json["product_id"]).to eql(product_id)
    end
  end
  
  describe 'GET product by product type' do
    product_type = 1
    # idToken = generate_firebase_token "rk3142@columbia.edu"
    # user_id = get_user_id_from_token idToken
    before do
      session[:user_id] = user_id
      request.headers[:idToken]= idToken
      get :products_by_type, {:product_type => product_type}
    end

    it 'returns a http_status code as 200' do
      expect(response.status).to eq(200)
    end

    it 'returns a json response' do
      expect(response.content_type).to eq("application/json")
    end

    it 'returns list of products identifed by product type' do
      json_response = JSON.parse(response.body)
      product_type_list = json_response["products"][0]["product_type"]
      expect(product_type_list[0]["product_type"]).to eq(product_type)
    end
    
    it 'return all products with the specific type' do
      parsed_json = JSON.parse(response.body)
      expect(parsed_json["products"].length).to eq(Product.where('product_type = ?',product_type).length)
    end
  end

  describe 'Should get 403 error code for invalid session' do
    before do
      session[:user_id] = 1234
      get "all_product_types"
    end

    it 'returns 403 for invalid session' do
      expect(response.status).to eq(403)
    end
    
    it 'returns a json response' do
      expect(response.content_type).to eq("application/json")
    end

    it 'returns not logged in resp_msg' do
      response_body = JSON.parse(response.body)
      expect(response_body["resp_msg"]).to eq("You are not logged in")
    end
  end

  describe 'GET all similar products(Happy Path)' do

    # idToken = generate_firebase_token "rk3142@columbia.edu"
    # user_id = get_user_id_from_token idToken
    product_id = "B07MNSWM9V"
    before do
      session[:user_id] = user_id
      request.headers[:idToken]= idToken
      get :similar_products, {product_id: product_id}
    end

    it 'returns a http_status code as 200' do
      expect(response.status).to eq(200)
    end

    it 'returns a json response' do
      expect(response.content_type).to eq("application/json")
    end

    it 'returns 5 different products' do
      parsed_json = JSON.parse(response.body)
      expect(parsed_json["products"].length).to eq(5)
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


  describe 'GET search product by title' do

    # idToken = generate_firebase_token "rk3142@columbia.edu"
    # user_id = get_user_id_from_token idToken
    search_string = "Fruit"
    before do
      session[:user_id] = user_id
      request.headers[:idToken]= idToken
      get :search_products, {search_key: search_string}
    end

    it 'returns a http_status code as 200' do
      expect(response.status).to eq(200)
    end

    it 'returns a json response' do
      expect(response.content_type).to eq("application/json")
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

    it 'response has an element is_bookmarked' do
      parsed_json = JSON.parse(response.body)
      expect(parsed_json["products"][0]).to include("is_bookmarked")
    end
  end

end
