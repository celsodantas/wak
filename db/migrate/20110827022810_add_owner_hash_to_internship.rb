class AddOwnerHashToInternship < ActiveRecord::Migration
  def self.up
    add_column :internships, :owner_hash, :string
  end

  def self.down
    remove_column :internships, :owner_hash
  end
end
