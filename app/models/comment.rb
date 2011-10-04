class Comment < ActiveRecord::Base
  belongs_to :internships
  
  validates :email, :presence => true, :format => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i
  validates :content, :presence => true
end
