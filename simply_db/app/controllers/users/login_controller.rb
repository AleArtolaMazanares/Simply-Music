class Users::LoginController < ApplicationController
    skip_before_action :verify_authenticity_token

    def index
      @user = User.all
      render json: @user
    end
  
    def create
      user = User.find_by(email: params[:login][:email])
  
      if user && user.valid_password?(params[:login][:password])
        # Autenticación exitosa
        sign_in user # Puedes usar Devise's sign_in helper para iniciar sesión
        render json: { status: :success, user: user }
      else
        # Autenticación fallida
        render json: { status: :unauthorized, error: 'Invalid credentials' }, status: :unauthorized
      end
    end
  
    def destroy
      # Cerrar sesión
      sign_out # Puedes usar Devise's sign_out helper para cerrar sesión
      render json: { status: :success, message: 'Logged out successfully' }
    end
  end
  