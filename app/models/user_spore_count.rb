class UserSporeCount < ApplicationRecord
  self.table_name = "user_spore_count"

  def self.get_one_dollar_value
    return 50
  end

  def self.get_user_spore_obj(user_id)
    UserSporeCount.where(:user_id => user_id)
  end
end