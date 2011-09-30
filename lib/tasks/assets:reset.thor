class Assets < Thor
  desc 'reset', 'Reset assets from application. Remove everything from /tmp and /public and runs rake assets:precompile'
  def reset
    puts "\t# Removing public/assets folder"
    FileUtils.rm_r Dir["public/assets"]
    
    puts "\t# Cleaning cache"
    FileUtils.rm_r Dir["tmp/*"]
    
    puts "\t# Running 'bundle exec rake assets:precompile'"
    system("bundle exec rake assets:precompile")
  end
end