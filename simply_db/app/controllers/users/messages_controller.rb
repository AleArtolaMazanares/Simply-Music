class Users::MessagesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @messages = Message.includes(:user).all
    render json: @messages
  end

  def create
    @message = Message.new(message_params)
    if @message.save
      render json: @message
    else 
      render json: { status: :unprocessable_entity }
    end
  end

  def get_messages_by_artist
    content_artist_id = params[:content_artist_id]
    messages = Message.where(content_artist_id: content_artist_id)
    render json: messages
  end

  
 
  def like
    @message = Message.find(params[:id])
    @message.increment!(:likes_count)
    render json: { likes: @message.likes_count }
  end

  private

  def message_params
    params.require(:message).permit(:message_content, :sent_hour, :content_artist_id)
  end
end
