class SporeRedemptionHistory < ApplicationRecord
  self.table_name = "spore_redemption_history"

  def self.get_history(user_id)
    SporeRedemptionHistory.joins("LEFT JOIN spores_milestone_mapper on
spore_redemption_history.milestone_type = spores_milestone_mapper.type_key").select("spore_redemption_history.transaction_type,
spore_redemption_history.amount, spores_milestone_mapper.type_description, spore_redemption_history.created_at").where(:user_id => user_id)
  end
end