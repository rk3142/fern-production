
module FirebaseHelper


  # RK: Not used in application. Created for unit testing
  # def self.create_user(email, password, is_signup = false)
  #   if is_signup
  #     firebase_url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=#{FirebaseHelper.get_firebase_api_key}"
  #   else
  #     firebase_url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=#{FirebaseHelper.get_firebase_api_key}"
  #   end
  #   request_body = Hash.new
  #   request_body['email'] = email
  #   request_body['password'] = password
  #   request_body['returnSecureToken'] = true
  #   firebase_call = HTTParty.post(firebase_url, headers: {
  #     'Content-Type' => 'application/json'}, body: request_body.to_json)
  #   return firebase_call.body
  # end

  def self.validate_token(token)
    begin
      firebase_url = "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=#{FirebaseHelper.get_firebase_api_key}"
      request_body = Hash.new
      request_body['idToken'] = token
      firebase_call = HTTParty.post(firebase_url, headers: {
        'Content-Type' => 'application/json'}, body: request_body.to_json)
      response = firebase_call.body
      return response, firebase_call.code
    rescue Exception => e
      Rails.logger.error e.message
      raise Exception.new "Generic Exception"
    end
  end

  private

  def self.get_firebase_api_key
    return Fern::Application.config.firebase_api_key
  end
end