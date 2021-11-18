class SporesSerializer
  def self.get_spores_history(spores)
    {
      "data": spores.map do |spore|
        {
          "type": spore.transaction_type,
          "amount": spore.amount,
          "details": spore.type_description,
          "transaction_date": spore.created_at
          }
      end
    }
  end

  def self.get_milestones(milestones)
    {
      "data": milestones.map do |milestone|
        {
          "type_key": milestone.type_key,
          "type_id": milestone.type_id,
          "amount": milestone.amount,
          "details": milestone.type_description
        }
      end
    }
  end
end