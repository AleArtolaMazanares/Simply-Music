class FeedsController < ApplicationController
    def index
      @feeds = Feed.includes(:artist, :message).all
      render json: @feeds
    end
  end