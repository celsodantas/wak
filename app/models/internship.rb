class Internship < ActiveRecord::Base
  has_and_belongs_to_many :fields
  before_save :save_or_use_fields
  
  scope :newer, lambda { |filter| 
    if filter
      filter = "%"+filter+"%"
      where("description like ? OR title like ?", filter, filter).order("created_at DESC") 
    else
      order("created_at DESC") 
    end
  }
  
  def save_or_use_fields
    self.fields.collect! do |field|
      field = Field.find_or_initialize_by_description(field.description)
    end
  end
  
end
