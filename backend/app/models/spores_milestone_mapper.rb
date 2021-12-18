class SporesMilestoneMapper < ApplicationRecord
  self.table_name = "spores_milestone_mapper"

  def self.get_one_dollar_value
    return 50
  end
end