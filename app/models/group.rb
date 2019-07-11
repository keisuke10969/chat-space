class Group < ApplicationRecord
    has_many: members
    belongs_to: users, through: :members
end
