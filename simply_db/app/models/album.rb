class Album < ApplicationRecord
    mount_uploader :song_file, Mp3FileUploader  
    validates_presence_of :img, :description, :name_album, :song_file, :content_artist_id;
end
