class SessionController < ApplicationController

  include SessionHelper

  def destroy
    log_out
    render :nothing => true, status: 204
  end
end
