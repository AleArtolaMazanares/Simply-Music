class Song < ApplicationRecord
    mount_uploader :song_file, Mp3FileUploader
    belongs_to :content_artist
  
    validates_presence_of :title_song, :song_file, :genre, :song_duration, :content_artist_id, :image
    validates_uniqueness_of :title_song, scope: :content_artist_id, case_sensitive: false
  end