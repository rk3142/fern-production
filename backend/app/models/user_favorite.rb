class UserFavorite < ApplicationRecord
  self.table_name = "user_favorite"

  def self.delete_by_user_id_and_product_id(user_id, product_id)
    UserFavorite.where(:user_id => user_id, :product_id => product_id).delete_all
  end

  def self.find_by_user_id(user_id)
    UserFavorite.select("product_id").where(:user_id => user_id)
  end
end