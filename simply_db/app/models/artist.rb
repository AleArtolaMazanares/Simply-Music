class Artist < ApplicationRecord
  has_many :feeds 
  belongs_to :user
  has_many :songs
  validates :mp3_file, presence: true
  enum role: [:user, :artist]
  mount_uploader :mp3_file, Mp3FileUploader  
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

         validates_presence_of :name_artist, :social, :description_artist, :tags

end
