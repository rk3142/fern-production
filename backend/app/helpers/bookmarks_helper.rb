module BookmarksHelper

  def self.get_bookmarked_products(user_id)
    fav_product_id = UserFavorite.find_by_user_id(user_id)
    product_id_list = []
    if fav_product_id.present?
      fav_product_id.each do |product_id|
        product_id_list.push(product_id.product_id)
      end
    end
    return product_id_list
  end

  def self.is_bookmarked?(product_id, bookmarked_products)
    if bookmarked_products.include?product_id
      is_bookmarked = 1
    else
      is_bookmarked = 0
    end
    return is_bookmarked
  end
end
