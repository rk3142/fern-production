class ProductPriceMapper < ApplicationRecord
  self.table_name = "product_price_mapper"

  def self.get_max_price_of_product product_id
    price =  ProductPriceMapper.select('price').where(:product_id => product_id).maximum('price')
    return price
  end
end