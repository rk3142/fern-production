class MainController < ApplicationController
  def index
    p Fern::Application.config.firebase_api_key
  end
end