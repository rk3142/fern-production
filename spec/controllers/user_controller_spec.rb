require 'rails_helper'

RSpec.describe UserController do
    describe "create user" do
        describe "valid user creation" do
            idToken = generate_firebase_token "rk3142@columbia.edu"
            user_id = get_user_id_from_token idToken
            before do
              "Before all of valid user creation"
              request.headers["idToken"] = idToken
              User.delete(user_id)
              post 'login'
            end

            it "has a 200 status code" do
                expect(response.status).to eq(200)
            end
            it "has json response body" do
                expect(response.content_type).to eq("application/json")
            end

            it "has user object in body" do
              json = JSON.parse(response.body)
              expect(json["user"]).to include("user_id")
            end
        end

        describe "invalid user creation" do
            before do
                request.headers["idToken"] = generate_firebase_token "rk314@columbia.edu"
                post 'login'
            end

            it "does not have a 200 status code" do
                expect(response.status).to eq(400)
            end
        end
    end




end
