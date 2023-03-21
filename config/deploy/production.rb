set :branch, "master"
role :app, "ubuntu@54.227.98.212"
role :web, "ubuntu@54.227.98.212"
role :db, "ubuntu@54.227.98.212"
set :rails_env, 'production'
set :linked_files, %w(database.yml credentials/production.key).map { |str| "config/#{str}" }
set :yarn_flags, '--production --silent --no-progress'
set :deploy_to, "/home/ubuntu/signdocs"