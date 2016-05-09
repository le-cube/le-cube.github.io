require "rubygems"

task :default => [:serve]

desc "Serve site locally"
task :serve do |t, args|
  system "bundle exec jekyll serve --config _config.yml,_config_dev.yml"
end

desc "Build jekyll site"
task :build do
  system "bundle exec jekyll build --config _config.yml,_config_dev.yml"
end

task :prod do |t|
  puts "Building with production parameters"
  sh 'jekyll build --trace'
end
