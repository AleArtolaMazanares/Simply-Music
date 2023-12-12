class Feed < ApplicationRecord
    belongs_to :user
    validates_presence_of :content, :date, :user_id
end
