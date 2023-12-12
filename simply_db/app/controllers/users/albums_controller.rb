class Users::AlbumsController < ApplicationController
  skip_before_action :verify_authenticity_token

  # GET /albums
  def index
    @albums = Album.all
    render json: @albums
  end

  # GET /albums/1
  def show
    @album = Album.find(params[:id])
    render json: @album
  end

  # POST /albums
  def create
    @album = Album.new(album_params)

    if @album.save
      render json: @album, status: :created
    else
      render json: @album.errors, status: :unprocessable_entity
    end
  end

  def get_album_by_content_artist
    content_artist_id = params[:content_artist_id]
    albums = Album.where(content_artist_id: content_artist_id)
    render json: albums
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_album
    @album = Album.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def album_params
    params.require(:album).permit(:name_album, :img, :description, :content_artist_id, song_files: [])
  end
end
