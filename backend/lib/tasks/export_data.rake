namespace :export do
  desc "Export data"
  task :export_to_seeds => :environment do

    ProductType.all.each do |product_type|
      excluded_keys = ['created_at', 'updated_at', 'id']
      serialized = product_type.serializable_hash.delete_if{|key,value| excluded_keys.include?(key)}
      puts "ProductType.create(#{serialized})"
    end

    Product.all.each do |product|
      excluded_keys = ['created_at', 'updated_at', 'id']
      serialized = product.serializable_hash.delete_if{|key,value| excluded_keys.include?(key)}
      puts "Product.create(#{serialized})"
    end

    ProductPriceMapper.all.each do |prices|
      excluded_keys = ['created_at', 'updated_at', 'id']
      serialized = prices.serializable_hash.delete_if{|key,value| excluded_keys.include?(key)}
      puts "ProductPriceMapper.create(#{serialized})"
    end
  end
end