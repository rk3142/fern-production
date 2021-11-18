class ProductType < ApplicationRecord
  self.table_name = "product_types"
  has_one :product
end