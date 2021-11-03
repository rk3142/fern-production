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
    begin
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
    rescue Exception => e
      Rails.logger.error "Exception occurred while processing API: get_products_by_type"
      Rails.logger.error e.message
      render :nothing => true, status: 500
    end
  end

  def show
    Rails.logger.info "Proceeding to process API: get_user_details"
    begin
      msg = Hash.new
      p params[:user_id]
      user = User.find_by_user_id(params[:user_id])
      msg[:user] = user
      render json: msg, status: 200
    rescue Exception => e
      Rails.logger.error "Exception occurred while processing API: get_user_details"
      Rails.logger.error e.message
      render :nothing => true, status: 500
    end
  end

  private

  def save_user_data(firebase_response)
    begin
      user_obj = firebase_response["users"][0]
      user = User.find_by_email_address(user_obj['email'])
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
        user.save
      end
      return user
    rescue Exception => e
      Rails.logger.error "Exception occurred while processing function: save_user_data"
      Rails.logger.error e.message
      raise Exception.new "Generic Exception"
    end
  end
end
