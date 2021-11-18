module SporeManagementHelper

  def self.process_claim_request(amount, product_id, user_id , invoice_id)
    claim_processed = false
    response = ""
    if Product.exists?(:product_id => product_id)
      unless SporeRedemptionHistory.exists?(:product_id => product_id, :user_id => user_id, :transaction_type => 'claim')
        unless SporeRedemptionHistory.exists?(:invoice_id => invoice_id, :transaction_type => 'claim')
          max_product_price = ProductPriceMapper.get_max_price_of_product product_id
          amount = [amount.to_f, max_product_price].min
          spores_claimed = SporeManagementHelper.convert_amount_to_spores amount
          @current_user_spore = User.select("current_spore_count").where(:user_id => user_id).first
          if @current_user_spore.present?
            @current_user_spore.current_spore_count += spores_claimed
            User.where(:user_id => user_id).update_all(:current_spore_count => @current_user_spore.current_spore_count)
            SporeManagementHelper.save_spore_history(user_id, "claim", spores_claimed, "", product_id, invoice_id)
            claim_processed = true
          else
            response = "User not found"
          end
        else
          response = "Invoice already redeemed"
        end
      else
        response = "User already redeemed this product purchase"
      end
    else
      response ="Invalid product received"
    end
    return claim_processed, response
  end

  def self.process_redemption_request(user_id, redemption_type_key, quantity)
    redemption_processed = false
    reason = ""
    @user_spores = User.select("current_spore_count").where(:user_id => user_id).first
    if @user_spores.present?
      user_current_spores = @user_spores.current_spore_count
      @spores_types = SporesMilestoneMapper.select('type_key, amount, type_key').where(:type_key => redemption_type_key).first
      if @spores_types.present?
        spore_amount = @spores_types.amount*quantity.to_i
        if user_current_spores > spore_amount
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

  def self.save_spore_history(user_id, transaction_type, spore_count, milestone_type, product_id ="", invoice_id = "")
    @spore_history = SporeRedemptionHistory.new
    @spore_history.user_id = user_id
    @spore_history.transaction_type = transaction_type
    @spore_history.amount = spore_count
    @spore_history.milestone_type = milestone_type
    @spore_history.product_id = product_id
    @spore_history.invoice_id = invoice_id
    @spore_history.save
  end
end
