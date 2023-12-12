class Message < ApplicationRecord
    validates_presence_of :message_content, :sent_hour, :content_artist_id
end
