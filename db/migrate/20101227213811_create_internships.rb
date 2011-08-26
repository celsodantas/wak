class CreateInternships < ActiveRecord::Migration
  def self.up
    create_table :internships do |t|
      t.string :title
      t.text :description

      t.timestamps
    end
  end

  def self.down
    drop_table :internships
  end
end
