module UserHelper
  def self.get_trees_planted(user_id)
    user_spores_history = SporeRedemptionHistory.select('milestone_type, amount').where(
      :user_id => user_id, :transaction_type => "redeem")
    type_amount_hash = {}
    milestones_infos = SporesMilestoneMapper.select('type_key, amount')

    milestones_infos.each do |milestone|
      type_amount_hash[milestone.type_key] = milestone.amount
    end
    trees_planted = 0
    if user_spores_history.present?
      user_spores_history.each do |row|
        trees_planted += (row.amount / type_amount_hash[row.milestone_type])
      end
    end

    return trees_planted
  end
end
