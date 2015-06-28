require 'json'
require 'sinatra'
require 'data_mapper'

DataMapper::Logger.new($stdout, :debug)
DataMapper.setup(
	:default,
	'mysql://codex:codex@localhost/codex'
)

require './models'
require './routes'

DataMapper.finalize