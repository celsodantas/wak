# encoding: utf-8 
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ :name => 'Chicago' }, { :name => 'Copenhagen' }])
#   Mayor.create(:name => 'Daley', :city => cities.first)

fields = ["Arquitetura",
          "Ciência da Computação",
          "Direito",
          "Engenharia Civil",
          "Educação Física"]

fields.each do |t|
  Field.create(:description => t)
end

Internship.create(:title=>"Escritório de Silvio Bararó",
                  :description=>"Maecenas sed diam eget risus varius blandit sit amet non magna. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Cras mattis consectetur purus sit amet fermentum. Nulla vitae elit libero, a pharetra augue.")
Internship.create(:title=>"Design Gráfico I3E",
                  :description=>"Nullam quis risus eget urna mollis ornare vel eu leo. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Cras mattis consectetur purus sit amet fermentum.")
Internship.create(:title=>"Escritório de Marcelo Sá",
                  :description=>"Sed posuere consectetur est at lobortis. Maecenas faucibus mollis interdum. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Donec ullamcorper nulla non metus auctor fringilla.")
Internship.create(:title=>"Escritório de Advocacia Moedo Barbosa",
                  :description=>"Cras mattis consectetur purus sit amet fermentum. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec ullamcorper nulla non metus auctor fringilla.")
Internship.create(:title=>"Desenvolvedor Java",
                  :description=>"Donec ullamcorper nulla non metus auctor fringilla. Cras mattis consectetur purus sit amet fermentum. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Sed posuere consectetur est at lobortis.")
   