class Users::ArtistsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :authenticate_user!, only: [:create]

  def index
    @artists = Artist.includes(:user).all
    render json: @artists.to_json(include: :user)
  end

  def show
    @artist = Artist.find_by(id: params[:id])
    render json: @artist
  end

  def create
    if current_user
      @artist = current_user.artists.build(artist_params)
      if @artist.save
        render json: { status: :success, message: 'Registro exitoso, espera respuesta de un administrador.' }
      else
        render json: { errors: @artist.errors.full_messages, status: :unprocessable_entity }
      end
    else
      render json: { errors: 'No se ha encontrado un usuario autenticado.', status: :unprocessable_entity }
    end
  end
  private

  def artist_params
    params.require(:artist).permit(
      :name_artist, 
      :email, 
      :password, 
      :password_confirmation, 
      :social, 
      :description_artist, 
      :tags, 
      :mp3_file
    )
  end
end
