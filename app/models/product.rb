class Product < ApplicationRecord
  self.table_name = "products"

  def self.find_all_by_product_type product_type
    Product.where(product_type: product_type)
  end
end