
class Users::SongsController < ApplicationController
    skip_before_action :verify_authenticity_token

    def index 
        @song = Song.all
        render json: @song
    end

    def show
        @song = Song.find(params[:id])
        render json: @song
    end
  
    def create
      @song = Song.new(song_params)
  
      if @song.save
        render json: @song, status: :created
      else
        render json: @song.errors, status: :unprocessable_entity
      end
    end
  
    def get_songs_by_content_artist
      content_artist_id = params[:content_artist_id]
      songs = Song.where(content_artist_id: content_artist_id)
      render json: songs, only: [:title_song, :genre, :song_duration, :id, :song_file, :image]
    end

    def get_songs_by_id
      id = params[:id]
      songs = Song.where(id: id)
      render json: songs
    end

    def search
      query = params[:query]
      @songs = Song.where("title_song LIKE ?", "%#{query}%")
      render json: @songs, only: [:title_song, :genre, :song_duration, :id, :song_file]
    end

    def destroy
      @song = Song.find(params[:id])
      @song.destroy
      head :no_content
    end
  
    private
  
    def song_params
      params.require(:song).permit(:title_song, :song_file, :genre, :song_duration, :content_artist_id, :image)
    end
  end
  