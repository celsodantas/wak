ActiveAdmin.register Internship do
  index do
      column :id
      column :title
      column :description
      column "Fields" do |f|
        f.fields.map { |i| i.description }.join ","
      end
      column :created_at
      column :updated_at
      default_actions
    end  
end
