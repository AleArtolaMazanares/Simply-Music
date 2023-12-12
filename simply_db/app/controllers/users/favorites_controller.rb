class FavoritesController < ApplicationController
    def index
      @favorites = Favorite.includes(:user, :song).all
      render json: @favorites
    end
  end
  