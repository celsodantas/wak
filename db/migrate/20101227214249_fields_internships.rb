class FieldsInternships < ActiveRecord::Migration
  def self.up
    create_table :fields_internships, :id => false do |t|
      t.integer :field_id
      t.integer :internship_id
    end
  end

  def self.down
    drop_table :fields_internships
  end
end
