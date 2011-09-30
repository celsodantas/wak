# coding: utf-8 
class Internship < ActiveRecord::Base
  has_and_belongs_to_many :fields
  before_save :save_or_use_fields
  
  validates :title, :presence => true
  validates :description, :uniqueness => {:in => true, :message => "Não é possível existir dois anúcios iguais. Altere a Descrição."}, 
            :presence => true
  validate :forbidden_words
  
  FWORDS = %w{porra porr@ p0rra porr@ sexo s3xo s3x0
              bixa bicha biba viado v1ado v1ad0 gay
              homosexual}
                       
  def forbidden_words
    FWORDS.each do |w|
      if self.title.match w
        errors[:title] << "Remova palavras de baixo calão do Título."
      end
      
      if self.description.match w
        errors[:description] << "Remova palavras de baixo calão da Descrição."
      end
    end
  end
  
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
