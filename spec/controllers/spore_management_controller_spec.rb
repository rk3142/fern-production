require 'rails_helper'

RSpec.describe SporeManagementController do
  idToken = ""
  user_id = ""
  previous_spore_count = 0
  before(:context) do
    idToken = generate_firebase_token "rk3142@columbia.edu"
    user_id = get_user_id_from_token idToken
    User.where(:user_id => user_id).delete_all
    SporeRedemptionHistory.where(:user_id => user_id).delete_all
    User.create(:user_id => user_id,
                :email_address => "rk3142@columbia.edu",
                :current_spore_count => 0)
    previous_spore_count = User.select('current_spore_count').where(:user_id => user_id).first
    previous_spore_count = previous_spore_count.current_spore_count
  end

  describe 'PUT Allows user to claim a spores for a product(Happy Path)' do
    claim_params = {
        "product_id": "B077ZMKWVM",
        "amount": 15.99,
        "invoice_id": "apple"
    }

    before do
      session[:user_id] = user_id
      request.headers[:idToken]= idToken
      put :claim_spores, {:claim => claim_params}
    end


    it 'returns a http_status code as 202' do
      expect(response.status).to eq(202)
    end

    it 'increases the spore count' do
      new_spore_count = User.select('current_spore_count').where(:user_id => user_id).first
      new_spore_count = new_spore_count.current_spore_count
      difference = new_spore_count - previous_spore_count
      expect(difference).to be > 0
    end
  end

  describe 'PUT Rejects when same invoice used' do
    claim_params = {
      "product_id": "B077ZMKWVM",
      "amount": 15.99,
      "invoice_id": "apple"
    }

    before do
      session[:user_id] = user_id
      request.headers[:idToken]= idToken
      put :claim_spores, {:claim => claim_params}
    end


    it 'returns a http_status code as 406' do
      expect(response.status).to eq(406)
    end
  end

  describe 'GET Returns the transaction history of the user' do

    before do
      session[:user_id] = user_id
      request.headers[:idToken]= idToken
      get :show_history
    end

    it 'returns a http_status code as 200' do
      expect(response.status).to eq(200)
    end

    it 'returns a json response' do
      expect(response.content_type).to eq("application/json")
    end

    it 'response has an element type which informs the type of transaction' do
      parsed_json = JSON.parse(response.body)
      expect(parsed_json["data"][0]).to include("type")
    end

    it 'response has an element amount which informs the amount of transaction' do
      parsed_json = JSON.parse(response.body)
      expect(parsed_json["data"][0]).to include("amount")
    end

    it 'response has an element details describing the details of purchase' do
      parsed_json = JSON.parse(response.body)
      expect(parsed_json["data"][0]).to include("details")
    end

    it 'response has an element transaction_date describing the time of transaction' do
      parsed_json = JSON.parse(response.body)
      expect(parsed_json["data"][0]).to include("transaction_date")
    end

  end


  describe 'GET Returns the list of action user can take to redeem spores' do

    before do
      session[:user_id] = user_id
      request.headers[:idToken]= idToken
      put :get_milestones
    end

    it 'returns a http_status code as 200' do
      expect(response.status).to eq(200)
    end

    it 'returns a json response' do
      expect(response.content_type).to eq("application/json")
    end

    it 'response has an element type_key which informs the type of redemption' do
      parsed_json = JSON.parse(response.body)
      expect(parsed_json["data"][0]).to include("type_key")
    end

    it 'response has an element amount which informs the amount of 1 action' do
      parsed_json = JSON.parse(response.body)
      expect(parsed_json["data"][0]).to include("amount")
    end

    it 'response has an element details describing the details of action' do
      parsed_json = JSON.parse(response.body)
      expect(parsed_json["data"][0]).to include("details")
    end

  end


  describe 'GET Returns error if invalid user received' do

    before do
      session[:user_id] = "ssssssss"
      request.headers[:idToken]= idToken
      put :show_history
    end

    it 'returns a http_status code as 404' do
      expect(response.status).to eq(404)
    end

  end

  describe 'PUT Allows user to redeem a spores for a product(Happy Path)' do


    redeem_params = {
      "type_key": "TREE",
      "quantity": 1
    }

    current_spore_count = 0
    before do
      current_spore_count = User.select('current_spore_count').where(:user_id => user_id).first
      current_spore_count = current_spore_count.current_spore_count
      session[:user_id] = user_id
      request.headers[:idToken]= idToken
      put :redeem_spores, {:redeem => redeem_params}
    end



    it 'returns a http_status code as 202' do
      expect(response.status).to eq(202)
    end

    it 'decreases the spore count' do
      new_spore_count = User.select('current_spore_count').where(:user_id => user_id).first
      new_spore_count = new_spore_count.current_spore_count
      difference = new_spore_count - current_spore_count
      expect(difference).to be < 0
    end
  end

  describe "PUT Doesn't allow user to redeem as price is greater" do

    redeem_params = {
      "type_key": "TREE",
      "quantity": 1
    }

    before do
      session[:user_id] = user_id
      request.headers[:idToken]= idToken
      previous_spore_count = User.select('current_spore_count').where(:user_id => user_id).first
      previous_spore_count = previous_spore_count.current_spore_count
      put :redeem_spores, {:redeem => redeem_params}
    end

    it 'returns a http_status code as 406' do
      expect(response.status).to eq(406)
    end

  end
end
