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
      product_hash[:green_quotient] = (0.1337*product.carbon + 0.5175*product.water + 0.1252*product.energy).round(3)
      type_list.push(ProductType.find_by_product_type(product.product_type))
      price_list.push(ProductPriceMapper.find_by_product_id(product.product_id))
      product_hash['product_type'] = type_list
      product_hash['prices'] = price_list
      return product_hash
  end

  def self.process_bulk_insertion(products)
      begin
          types_of_product = ['silk', 'cotton', 'polyster']
          product_map = products
          product_map.each do |single_product|
              @product = Product.new
              @product.product_name = single_product['title']
              @product.product_id = single_product['asin']
              @product.link = single_product['link']
              @product.image_url = single_product['image']
              @product.brand = single_product['brand']
              @product.rating = single_product['rating']
              @product.ratings = single_product['ratings_total']
              @product.product_type = 1

              carbon, water, energy = ProductHelper.get_environment_metrics types_of_product.sample
              @product.carbon = carbon
              @product.water = water
              @product.energy = energy
              @product.save!
              price_list = single_product['prices']
              price_list.each do |price|
                  @price_obj = ProductPriceMapper.new
                  @price_obj.product_id = single_product['asin']
                  @price_obj.product_link = single_product['link']
                  @price_obj.price = price['value']
                  @price_obj.save!
              end
          end
      rescue Exception => e
          p e.backtrace
      end
  end


  def self.get_environment_metrics(product_type)
      case product_type
      when "silk"
          carbon = rand(2.4...2.6).round(2)
          water = rand(2.4...2.8).round(2)
          energy = rand(1.0...1.2).round(2)
      when "polyster"
          carbon = rand(2.1...2.4).round(2)
          water = rand(3.0...3.4).round(2)
          energy = rand(2.0...2.4).round(2)
      when "cotton"
          carbon = rand(2.7...3.0).round(2)
          water = rand(3.0...4.0).round(2)
          energy = rand(1.3...1.8).round(2)
      end
      p "Carbon " + carbon.to_s
      p "Water " + water.to_s
      p "Energu " + energy.to_s
      return carbon, water, energy
  end
end
