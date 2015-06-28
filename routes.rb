get '/api/authors' do
	Author.all.to_json
end

get '/api/authors/:id' do
	author ||= Author.get(params[:id]) || halt(404)
	author.to_json(methods: [ :fics ])
end

get '/api/characters' do
	Character.all.to_json(methods: [ :series ])
end

get '/api/characters/:id' do
	character ||= Character.get(params[:id]) || halt(404)
	character.to_json(methods: [ :series ])
end

get '/api/fics' do
	Fic.all.to_json
end

get '/api/fics/:id' do
	fic ||= Fic.get(params[:id]) || halt(404)
	fic.to_json(methods: [ :authors, :genres, :series ])
end

get '/api/fics/:id/chapters' do
	fic ||= Fic.get(params[:id]) || halt(404)
	fic.chapters.all.to_json(:exclude => [ :data ])
end

get '/api/fics/:id/chapters/:number' do
	fic ||= Fic.get(params[:id]) || halt(404)
	chapter ||= fic.chapters.first(:number => params[:number]) || halt(404)
	chapter.to_json
end

get '/api/genres' do
	Genre.all.to_json
end

get '/api/genres/:id' do
	genre ||= Genre.get(params[:id]) || halt(404)
	genre.to_json(methods: [ :fics ])
end

get '/api/matchups' do
	Matchup.all.to_json(:relationships => { :characters => { :methods => [ :series ] } } )
end

get '/api/matchups/:id' do
	matchup ||= Matchup.get(params[:id]) || halt(404)
	matchup.to_json(:relationships => { :characters => { :methods => [ :series ] } } )
end

get '/api/series' do
	Series.all.to_json
end

get '/api/series/:id' do
	series ||= Series.get(params[:id]) || halt(404)
	series.to_json(methods: [ :fics ])
end
