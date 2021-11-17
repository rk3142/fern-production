class SporeManagementController < ApplicationController

  before_action :require_login

  def claim_spores
    user_id = session[:user_id]
    claim_params = params[:claim]
    amount = claim_params[:amount]
    product_id = claim_params[:product_id]
    invoice_id = claim_params[:invoice_id]
    is_claimed, response = SporeManagementHelper.process_claim_request amount, product_id, user_id, invoice_id
    resp_msg = {:msg => response}
    if is_claimed
      render json: resp_msg, status: :accepted
    else
      render json: resp_msg, status: :not_acceptable
    end
  end

  def redeem_spores
    user_id = session[:user_id]
    claim_params = params[:redeem]
    quantity = claim_params[:quantity]
    type = claim_params[:type_key]
    is_redeemed, response = SporeManagementHelper.process_redemption_request user_id, type, quantity
    resp_msg = {:msg => response}
    if is_redeemed
      render json: resp_msg, status: :accepted
    else
      render json: resp_msg, status: :not_acceptable
    end
  end

  def show_history
    user_id = session[:user_id]
    if User.exists?(user_id)
      spores = SporeRedemptionHistory.get_history(user_id)
      render json: SporesSerializer.get_spores_history(spores), status: :ok
    else
      render json: { error: 'user not found' }, status: :not_found
    end
  end

  def get_milestones
    milestones = SporesMilestoneMapper.all
    render json: SporesSerializer.get_milestones(milestones), status: :ok
  end


  # private
  #
  # def spores_param
  #   params.require(:r).permit(:title, :rating, :description, :release_date, :director)
  # end
end
