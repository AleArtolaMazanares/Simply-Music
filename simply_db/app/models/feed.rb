class Feed < ApplicationRecord
    belongs_to :artist
    has_one :message
end
