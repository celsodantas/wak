class Internship < ActiveRecord::Base
  has_and_belongs_to_many :fields
  
  # Store admin who has unblocked it
  belongs_to :user 
  
  scope :newer, lambda { |filter| 
    filter = "%"+filter+"%"
    where("description like ? OR title like ?", filter, filter).order("updated_at DESC") 
  }
end
