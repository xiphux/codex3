require 'oj'
require 'sinatra'
require 'sinatra/config_file'
require 'data_mapper'

config_file 'config/config.yml'

DataMapper::Logger.new($stdout, :debug)
DataMapper.setup(:default, {
	:adapter => settings.adapter,
	:database => settings.database,
	:username => settings.username,
	:password => settings.password,
	:host => settings.host
})

configure do
	mime_type :appcache, 'text/cache-manifest'
end

require './models'
require './routes'

DataMapper.finalize