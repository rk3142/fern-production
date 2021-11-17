class ApplicationController < ActionController::Base

  include FirebaseHelper

  private

  def get_limit_value(limit)
    if limit.nil?
      return 50
    else
      return limit
    end
  end

  def get_offset_value(offset)
    if offset.nil?
      return 0
    else
      return offset
    end
  end

  def require_login
    unless logged_in?
      msg = {:resp_msg => "You are not logged in"}
      render json: msg, status: 403
      return
    end
  end






  def logged_in?
    session_user = session[:user_id]
    # p request.headers[:idToken]
    firebase_response, error_code = FirebaseHelper.validate_token(request.headers[:idToken])
    #p error_code
    # p firebase_response.inspect
    unless error_code.to_s == "200"
      return false
    end
    if session[:user_id].nil?
      firebase_response = JSON.parse(firebase_response)
      session[:user_id] = firebase_response["users"][0]['localId']
    end
    return true
    # firebase_response = JSON.parse(firebase_response)
    # user_id = firebase_response["users"][0]['localId']
    # #p session_user
    # # p user_id
    # return session_user == user_id
  end

end
