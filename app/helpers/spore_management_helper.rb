module SporeManagementHelper

  def self.process_claim_request(amount, product_id, user_id)
    claim_processed = false
    if Product.exists?(:product_id => product_id)
      unless SporeRedemptionHistory.exists?(:product_id => product_id, :user_id => user_id, :trasaction_type => 'claim')
        spores_claimed = SporeManagementHelper.convert_amount_to_spores amount
        @current_user_spore = UserSporeCount.get_user_spore_obj user_id
        @current_user_spore.current_spore_count += spores_claimed
        @current_user_spore.save
        SporeManagementHelper.save_spore_history(user_id, "claim", spores_claimed, "")
        claim_processed = true
      end
    end
    return claim_processed
  end

  def self.process_redemption_request(user_id, redemption_type_key)
    redemption_processed = true
    @user_spores = UserSporeCount.select("current_spores_count").where(:user_id => user_id).first
    if @user_spores.present?
      user_current_spores = @user_spores.current_spores_count
      @spores_types = SporesMilestoneMapper.select('type_key, amount, type_key').where(:type_key => redemption_type_key).first
      if @spores_types.present?
        spore_amount = @spores_types.amount
        if user_current_spores > spore_amount
          SporeManagementHelper.save_spore_history(user_id, "redeem", spore_amount, @spores_types.type_key)
          redemption_processed = true
        end
      end
    end
    return redemption_processed
  end

  def self.convert_amount_to_spores(amount)
    rounded_amount = amount.round
    return rounded_amount * UserSporeCount.get_one_dollar_value
  end

  def self.save_spore_history(user_id, transaction_type, spore_count, milestone_type)
    @spore_history = SporeRedemptionHistory.new
    @spore_history.user_id = user_id
    @spore_history.transaction_type = transaction_type
    @spore_history.amount = spore_count
    @spore_history.milestone_type = milestone_type
    @spore_history.save
  end
end
