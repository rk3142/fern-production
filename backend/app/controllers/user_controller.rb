class UserController < ApplicationController
  include FirebaseHelper
  include SessionHelper

  # For development purpose
  # def new
  #   firebase_response = FirebaseHelper.create_user(params[:email], params[:password], false)
  #   Rails.logger.info firebase_response.inspect
  #   render json: firebase_response, status: 200
  # end

  def login
    msg = Hash.new
    Rails.logger.info "Proceeding to log in user"
    firebase_response, error_code = FirebaseHelper.validate_token(request.headers[:idToken])
    unless error_code.to_s == "200"
      render json: firebase_response, status: error_code
      return
    end
    user = save_user_data JSON.parse(firebase_response)
    log_in user
    msg['user'] = user
    render json: msg, status: 200
  end

  def show
    Rails.logger.info "Proceeding to process API: get_user_details"
    msg = Hash.new
    user = User.find_by_user_id(params[:user_id])
    msg[:user] = user
    render json: msg, status: 200
  end

  private

  def save_user_data(firebase_response)
    user_obj = firebase_response["users"][0]
    user = User.find_by_email_address(user_obj['email'])
    unless user.present?
      user = User.new
      user.user_id = user_obj['localId']
      user.email_address = user_obj['email']
      user.created_at = Time.now
      user.updated_at = Time.now
      user.save
    end
    return user
  end
end
