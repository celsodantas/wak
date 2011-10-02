ActiveAdmin.register Internship do
  index do
      column :id
      column :title
      column :description
      column :fields do |f|
        f.title
      end
      column "Create Date", :created_at
      column "Update Date", :updated_at
      default_actions
    end  
end
