class User < ApplicationRecord
  has_one :artist
  has_many :comments
  has_many :messages
  has_many :playlists
  has_many :favorites
  has_many :playhistories
  has_many :artists
  has_one :content_artist, dependent: :destroy
  enum role: [:user, :artist, :admin]
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable

    devise :database_authenticatable, :registerable,
           :recoverable, :rememberable, :validatable

    validates_presence_of :name_users

end
