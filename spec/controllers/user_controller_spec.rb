require 'rails_helper'

RSpec.describe UserController, type: :controller do
    
    
    describe "create user" do
        describe "valid user creation" do
            before(:each) do
                #create user with email bob@fern.com and password Bob@123456
            end
            it "has a 200 status code" do
                post :new, {:email => "alice@fern.com", :password => "Alice@123456"} # will this be rolled back by firebase ?
                expect(response.status).to eq(200)
            end
            it "get reponse body" do
                post :new, {:email => "bob@fern.com", :password => "Bob@123456"} # will this be rolled back by firebase ?
                expect(firebase_response.nil?).to be false
            end
        end

        
end
