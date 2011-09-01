class Internship < ActiveRecord::Base
  has_and_belongs_to_many :fields
  before_save :save_or_use_fields
  
  scope :newer, lambda { |params| 
    if params[:query]
      filter = "%"+params[:query]+"%"
      includes(:fields)
        .where("internships.description like ? OR title like ? OR fields.description like ?", filter, filter, filter)
        .order("internships.created_at DESC") 
    else
      includes(:fields).order("created_at DESC") 
    end
  }
  
  def save_or_use_fields
    self.fields.collect! do |field|
      field = Field.find_or_initialize_by_description(field.description)
    end
  end
  
end
