module ProductHelper

  def self.get_product_list(product, is_bookmarked = 0)
      type_list = []
      price_list = []
      product_hash = Hash.new
      product_hash[:product_id] = product.product_id
      product_hash[:is_bookmarked] = is_bookmarked
      product_hash[:product_name] = product.product_name
      product_hash[:product_description] = product.product_description
      product_hash[:link] = product.link
      product_hash[:image_url] = product.image_url
      product_hash[:brand] = product.brand
      product_hash[:rating] = product.rating
      product_hash[:ratings] = product.ratings
      product_hash[:carbon] = product.carbon
      product_hash[:water] = product.water
      product_hash[:energy] = product.energy
      type_list.push(ProductType.find_by_product_type(product.product_type))
      price_list.push(ProductPriceMapper.find_by_product_id(product.product_id))
      product_hash['product_type'] = type_list
      product_hash['prices'] = price_list
      return product_hash
  end
end
