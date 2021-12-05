module SporeManagementHelper

  def self.process_claim_request(amount, user_id , invoice_id)
    claim_processed = false
    response = ""
    unless SporeRedemptionHistory.exists?(:invoice_id => invoice_id, :transaction_type => 'claim')
      # max_product_price = ProductPriceMapper.get_max_price_of_product product_id
      # amount = [amount.to_f, max_product_price].min
      spores_claimed = SporeManagementHelper.convert_amount_to_spores amount
      @current_user_spore = User.select("current_spore_count").where(:user_id => user_id).first
      if @current_user_spore.present?
        @current_user_spore.current_spore_count += spores_claimed
        User.where(:user_id => user_id).update_all(:current_spore_count => @current_user_spore.current_spore_count)
        SporeManagementHelper.save_spore_history(user_id, "claim", spores_claimed, "", invoice_id)
        claim_processed = true
        response = "$#{amount} successfully converted to #{spores_claimed} spores."
      else
        response = "User not found"
      end
    else
      response = "Invoice already redeemed"
    end
    return claim_processed, response
  end

  def self.get_image_from_encoding(encoded_image)
    begin
      #img_from_base64 = Base64.decode64 encoded_image
      encoded_image_arr = encoded_image.split(',')
      img_from_base64 = encoded_image_arr[1]
      filetype = 'png'
      filename = (0...8).map { (65 + rand(26)).chr }.join + '_' + Time.now.to_i.to_s
      directory_path = Rails.root.to_s + '/public/invoice/'
      FileUtils.mkdir_p directory_path
      file = directory_path + filename << '.' << filetype
      File.open(file, 'wb') do |f|
        f.write(Base64.decode64(img_from_base64))
      end
      invoice_number, price = SporeManagementHelper.get_price_from_image file
      return invoice_number, price
    rescue Exception => e
      Rails.logger.error e.message
      p e.backtrace
    end
  end

  def self.get_price_from_image image_file
    begin
      image = RTesseract.new(image_file).to_s
      image_list = image.split("\n")
      new_image_list = []
      found_count = 0
      final_list = []
      image_list.each do |list|
        list = list.strip()
        if list.downcase.include?'order number'.downcase
          new_image_list.push(list)
          found_count += 1
        elsif list.downcase.include?'Order total'.downcase
          new_image_list.push(list)
          found_count += 1
        end
        if found_count == 2
          break
        end
      end
      new_image_list.each do |elements|
        new_list = elements.split(':')
        final_list.push(new_list[-1].strip())
      end
      price = final_list[1]
      price = price[1..-1].to_f
      return final_list[0], price
    rescue Exception => e
      Rails.logger.error e.message
      p e.backtrace
    end
  end

  def self.process_redemption_request(user_id, redemption_type_key, quantity)
    redemption_processed = false
    reason = ""
    @user_spores = User.select("current_spore_count").where(:user_id => user_id).first
    if @user_spores.present?
      user_current_spores = @user_spores.current_spore_count
      p user_current_spores
      @spores_types = SporesMilestoneMapper.select('type_key, amount, type_key').where(:type_key => redemption_type_key).first
      if @spores_types.present?
        spore_amount = @spores_types.amount*quantity.to_i
        if user_current_spores >= spore_amount
          SporeManagementHelper.save_spore_history(user_id, "redeem", spore_amount, @spores_types.type_key)
          user_current_spores -= spore_amount
          User.where(:user_id =>  user_id).update_all(:current_spore_count => user_current_spores)
          redemption_processed = true
          response = "redeemed successfully"
        else
          response = "Not enough spores to redeem"
        end
      end
    else
      response = "Not enough spores to redeem"
    end
    return redemption_processed, response
  end

  def self.convert_amount_to_spores(amount)
    rounded_amount = amount.round
    return rounded_amount * SporesMilestoneMapper.get_one_dollar_value
  end

  def self.save_spore_history(user_id, transaction_type, spore_count, milestone_type, invoice_id ="")
    @spore_history = SporeRedemptionHistory.new
    @spore_history.user_id = user_id
    @spore_history.transaction_type = transaction_type
    @spore_history.amount = spore_count
    @spore_history.milestone_type = milestone_type
    @spore_history.invoice_id = invoice_id
    @spore_history.save
  end
end
