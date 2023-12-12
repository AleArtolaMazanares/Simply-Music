class CommentsController < ApplicationController
    def index
      @comments = Comment.includes(:user, :song).all
      render json: @comments
    end
  end
  