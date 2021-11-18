class User < ApplicationRecord
  self.table_name = "user"
  self.primary_key = "user_id"
end