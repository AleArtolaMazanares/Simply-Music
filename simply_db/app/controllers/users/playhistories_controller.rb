class PlayhistoriesController < ApplicationController
    def index
      @playhistories = Playhistory.includes(:user, :song).all
      render json: @playhistories
    end
  end