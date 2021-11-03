require 'rails_helper'

RSpec.describe SessionController do
  describe "Remove the current session" do
    before do
      idToken = generate_firebase_token "rk3142@columbia.edu"
      user_id = get_user_id_from_token idToken
      session[:user_id] = user_id
    end

    it 'should logout the user' do
      delete 'destroy'
      expect(response.code).to eq("204")
    end
  end
end
