class InternshipPresenter
  def initialize(internship, helper)
    @internship = internship
    @helper = helper
  end
  
  def link_to_header
    h.link_to @internship.title, h.internship_path(@internship)
  end
  
  def release_date
    @internship.updated_at.strftime("%d/%m/%y")
  end
  
  def fields
    result = ""
    @internship.fields.each do |f|  
      p f.description
		  result += h.link_to f.description, :controller => "internships", :query => f.description 

		  if f != @internship.fields.last 
			  result += ", " 
		  else
		    result += "." 
	    end
		end 
		result.html_safe
  end
  
  def description
    h.markdown(@internship.description)
  end
  
  def link_to_comments
    h.link_to h.internship_path(@internship) do
			h.t 'views.comment', :count => @internship.comments.count
		end
  end
  
  def edit_link
    if recent? and owner?
      yield
    end
  end
  
  private
  def h
    @helper
  end
  
  def owner?
    @internship.owner_hash == h.cookies[:hash]
  end
  
  def recent?
    @internship.created_at > (Time.now - 15.minutes)
  end
end