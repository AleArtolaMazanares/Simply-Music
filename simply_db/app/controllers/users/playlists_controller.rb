class PlaylistsController < ApplicationController
    def index
      @playlists = Playlist.includes(:user).all
      render json: @playlists
    end
  end