# config valid for current version and patch releases of Capistrano
lock "~> 3.17.1"

set :application, "signdocs"
set :repo_url, "https://github.com/hyaminh2303/signdocs.git"

set :rbenv_type, :user
set :rbenv_ruby, '2.5.1'
set :rbenv_prefix, "RBENV_ROOT=#{fetch(:rbenv_path)} RBENV_VERSION=#{fetch(:rbenv_ruby)} #{fetch(:rbenv_path)}/bin/rbenv exec"
set :rbenv_map_bins, %w[rake gem bundle ruby rails]
set :rbenv_roles, :all
set :bundle_jobs, 1
append :linked_dirs, "log", "storage", "tmp/pids", "tmp/cache", "tmp/sockets", "public/system"

namespace :deploy do
  task :start_new_rails_server do
    on roles(:app) do
      execute "cd #{current_path}; touch tmp/restart.txt"
    end
  end
end

after 'deploy:finished', 'deploy:start_new_rails_server'


# Default value for linked_dirs is []

# Default value for keep_releases is 5
set :keep_releases, 5
