class SporeManagementController < ApplicationController

  # before_action :require_login

  def claim_spores
    user_id = session[:user_id]
    claim_params = params[:claim]
    amount = claim_params[:amount]
    product_id = claim_params[:product_id]
    if SporeManagementHelper.process_claim_request amount, product_id, user_id
      render nothing: true, status: :accepted
    else
      render json: { error: 'invalid request' }, status: :not_acceptable
    end
  end

  def redeem_spores
    user_id = session[:user_id]
    claim_params = params[:redeem]
    type = claim_params[:type_key]
    if SporeManagementHelper.process_redemption_request user_id, type
      render nothing: true, status: :accepted
    else
      render json: { error: 'invalid request' }, status: :not_acceptable
    end
  end

  def show_history
    user_id = session[:user_id]
    if User.exists?(user_id)
      spores = SporeRedemptionHistory.get_history(user_id)
      p spores.inspect
      render json: SporesSerializer.get_spores_history(spores), status: :ok
    else
      render json: { error: 'user not found' }, status: :not_found
    end
  end

  def show_current_balance

  end

  def get_milestones
    milestones = SporesMilestoneMapper.all
    render json: SporesSerializer.get_milestones(milestones), status: :ok
  end


  private

  def spores_param
    params.require(:movie).permit(:title, :rating, :description, :release_date, :director)
  end
end
