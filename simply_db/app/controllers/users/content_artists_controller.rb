class Users::ContentArtistsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index 
    @content = ContentArtist.all
    render json: @content
  end

  def show
    @content = ContentArtist.find_by(id: params[:id])
    render json: @content
  end

  def create
    @content_artist = ContentArtist.new(content_artist_params)

    if @content_artist.save
      render json: @content_artist, status: :created
    else
      render json: @content_artist.errors, status: :unprocessable_entity
    end
  end

  def update
    @content_artist = ContentArtist.find_by(id: params[:id])

    if @content_artist.update(content_artist_params)
      render json: @content_artist
    else
      render json: @content_artist.errors, status: :unprocessable_entity
    end
  end

  def get_ids_by_user
    user_id = params[:user_id]
    content_artist_ids = ContentArtist.where(user_id: user_id).pluck(:id)
    render json: content_artist_ids
  end

  private

  def content_artist_params
    params.require(:content_artist).permit(:name, :image, :description, :genre, :user_id)
  end
end
