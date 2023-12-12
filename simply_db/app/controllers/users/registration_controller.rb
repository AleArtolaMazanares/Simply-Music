class RegistrationsController < Devise::RegistrationsController
  before_action :configure_sign_up_params, only: [:create]

  private

  def configure_sign_up_params
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name_artist, :email, :password, :password_confirmation, :social, :description_artist, :tags, :mp3_file])
  end
end