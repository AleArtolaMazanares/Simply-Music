class Users::UsersController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @users = User.all
    render json: @users
  end

  def show
    @user = User.find(params[:id])
    render json: @user
  end

  def create
    @user = User.new(users_params)
    @user.role = :user
    if @user.save
      render json: @user
    else
      render json: { status: :unprocessable_entity }
    end
  end

  def update
    @user = User.find(params[:id])

    if @user.update(users_params)
      render json: @user
    else
      render json: { status: :unprocessable_entity }
    end
  end
  def destroy
    @user = User.find_by(id: params[:id])
  
    if @user
      if @user.destroy
        render json: { status: :ok }
      else
        render json: { status: :unprocessable_entity, error: @user.errors.full_messages }
      end
    else
      render json: { status: :not_found, error: 'User not found' }
    end
  end
  

  def search
    query = params[:query]
    @users = User.where("name_users LIKE ? OR email LIKE ?", "%#{query}%", "%#{query}%")

    if @users.any?
      render json: @users
    else
      render json: { status: :not_found }
    end
  end

  private

  def users_params
    params.require(:users).permit(:name_users, :email, :password, :password_confirmation, :role)
  end
end
