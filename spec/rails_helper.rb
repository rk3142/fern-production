require 'simplecov'
SimpleCov.profiles.define 'no_vendor_coverage' do
  load_profile 'rails'
  add_filter ['vendor', 'app/jobs/', 'app/mailers/'] # Don't include vendored stuff
end

SimpleCov.start 'no_vendor_coverage'
# This file is copied to spec/ when you run 'rails generate rspec:install'
ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../../config/environment', __FILE__)
# Prevent database truncation if the environment is production
abort("The Rails environment is running in production mode!") if Rails.env.production?
require 'spec_helper'
require 'rspec/rails'
# Add additional requires below this line. Rails is not loaded until this point!

# Requires supporting ruby files with custom matchers and macros, etc, in
# spec/support/ and its subdirectories. Files matching `spec/**/*_spec.rb` are
# run as spec files by default. This means that files in spec/support that end
# in _spec.rb will both be required and run as specs, causing the specs to be
# run twice. It is recommended that you do not name files matching this glob to
# end with _spec.rb. You can configure this pattern with the --pattern
# option on the command line or in ~/.rspec, .rspec or `.rspec-local`.
#
# The following line is provided for convenience purposes. It has the downside
# of increasing the boot-up time by auto-requiring all files in the support
# directory. Alternatively, in the individual `*_spec.rb` files, manually
# require only the support files necessary.
#
# Dir[Rails.root.join('spec/support/**/*.rb')].each { |f| require f }

# Checks for pending migrations before tests are run.
# If you are not using ActiveRecord, you can remove this line.
ActiveRecord::Migration.maintain_test_schema!


def generate_firebase_token email
  firebase_url ="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=#{Fern::Application.config.firebase_api_key}"
  request_body = Hash.new
  request_body['email'] = email
  request_body['password'] = "com@1234"
  firebase_call = HTTParty.post(firebase_url, headers: {
    'Content-Type' => 'application/json'}, body: request_body.to_json)
  response = JSON.parse(firebase_call.body)
  # p response.inspect
  return response['idToken']
end

def get_user_id_from_token token
  firebase_response, error_code = FirebaseHelper.validate_token(token)
  firebase_response = JSON.parse(firebase_response)
  # p firebase_response.inspect
  user_id = firebase_response["users"][0]['localId']

  return user_id
end

RSpec.configure do |config|
  # Remove this line if you're not using ActiveRecord or ActiveRecord fixtures
  config.fixture_path = "#{::Rails.root}/spec/fixtures"

  # If you're not using ActiveRecord, or you'd prefer not to run each of your
  # examples within a transaction, remove the following line or assign false
  # instead of true.
  config.use_transactional_fixtures = false

  # RSpec Rails can automatically mix in different behaviours to your tests
  # based on their file location, for example enabling you to call `get` and
  # `post` in specs under `spec/controllers`.
  #
  # You can disable this behaviour by removing the line below, and instead
  # explicitly tag your specs with their type, e.g.:
  #
  #     RSpec.describe UsersController, :type => :requests do
  #       # ...
  #     end
  #
  # The different available types are documented in the features, such as in
  # https://relishapp.com/rspec/rspec-rails/docs
  config.infer_spec_type_from_file_location!
end
