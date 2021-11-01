class UserController < ApplicationController
  include FirebaseHelper

  def new
    firebase_response = FirebaseHelper.create_user(params[:email], params[:password], true)
    Rails.logger.info firebase_response.inspect
    render :nothing => true, status: 200
  end

  def login
    msg = Hash.new
    firebase_response, error_code = FirebaseHelper.validate_token(request.headers[:idToken])
    unless error_code.to_s == "200"
      render json: firebase_response, status: error_code
      return
    end
    user = save_user_data JSON.parse(firebase_response)
    log_in user
    msg['user'] = user
    render json: user, status: 200
  end

  def show
    msg = Hash.new
    user = User.find_by_user_id(params[:user_id])
    msg[:user] = user
    render json: user, status: 200
  end

  private

  def save_user_data(firebase_response)
    p firebase_response['users']
    user_obj = firebase_response["users"][0]
    p user_obj
    user = User.find_by_user_id(user_obj['localId'])
    unless user.present?
      user = User.new
      user.user_id = user_obj['localId']
      user.email_address = user_obj['email']
      unless user_obj['displayName'].nil?
        user.first_name = user_obj['displayName']
      end

      unless user_obj['photoUrl'].nil?
        user.profile_image = user_obj['photoUrl']
      end
      user.created_at = Time.now
      user.updated_at = Time.now
    else
      unless user_obj['displayName'].nil?
        user.first_name = user_obj['displayName']
      end

      unless user_obj['photoUrl'].nil?
        user.profile_image = user_obj['photoUrl']
      end
      user.updated_at = Time.now
    end
    user.save
    return user
  end
end
