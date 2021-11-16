class Product < ApplicationRecord
  self.table_name = "products"
  self.primary_key = "product_id"

  def self.find_all_by_product_type(product_type)
    Product.where(product_type: product_type)
  end

  def self.find_by_product_ids(product_ids)
    Product.where(:product_id => product_ids)
  end

  def self.get_products_by_title(title)
    Product.where("product_name LIKE ?", "%#{sanitize_sql_like(title)}%").all
  end

  def self.get_random_products(size, product_id)
    Product.where("product_id !=?", product_id).all.sample(size)
  end
end