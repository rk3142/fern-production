class ApplicationController < ActionController::Base

  private

  def get_limit_value limit
    if limit.nil?
      return 10
    else
      return limit
    end
  end

  def get_offset_value offset
    if offset.nil?
      return 0
    else
      return offset
    end
  end

end
