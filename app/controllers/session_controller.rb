class SessionController < ApplicationController

  include SessionHelper

  def new
  end

  def create
  end

  def destroy
    log_out
    render :nothing => true, status: 204
  end
end
