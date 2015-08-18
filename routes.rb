get '/api/authors' do
	Author.all.to_json
end

get '/api/authors/:id' do
	author ||= Author.get(params[:id]) || halt(404)
	author.to_json(:methods => [ :fics ])
end

get '/api/characters' do
	Character.all.to_json(:methods => [ :series ])
end

get '/api/characters/:id' do
	character ||= Character.get(params[:id]) || halt(404)
	character.to_json(:methods => [ :series ])
end

get '/api/fics' do
	fics = Fic.all
	if params['series']
		fics = fics.all(:fic_series => FicSeries.all(:series_id => params['series']))
	end
	if params['matchup']
		fics = fics.all(:fic_matchups => FicMatchup.all(:matchup_id => params['matchup']))
	end
	if params['genre']
		fics = fics.all(:fic_genres => FicGenre.all(:genre_id => params['genre']))
	end
	if params['search']
		if params['search'].kind_of?(Array)
			params['search'].each do |keyword|
				if not keyword.empty?
					# datamapper/dataobjects doesn't like using the ? param in this query
					fics = fics.all(:conditions => [ "UPPER(title) LIKE '%" + keyword.upcase.gsub("'","''") + "%'" ])
				end
			end
		else
			if not params['search'].empty?
				# datamapper/dataobjects doesn't like using the ? param in this query
				fics = fics.all(:conditions => [ "UPPER(title) LIKE '%" + params['search'].upcase.gsub("'","''") + "%'" ])
			end
		end
	end
	fics.to_json(:methods => [ :authors, :fic_genres, :fic_series, :fic_matchups ])
end

get '/api/fics/:id' do
	fic ||= Fic.get(params[:id]) || halt(404)
	fic.to_json(:methods  => [ :authors, :genres, :series ], :relationships => { :matchups => { :relationships => { :characters => { :methods => [ :series ]}}}})
end

get '/api/fics/:id/chapters' do
	fic ||= Fic.get(params[:id]) || halt(404)
	fic.chapters.all(:order => [:number.asc]).to_json(:exclude => [ :data, :wrapped, :no_paragraph_spacing, :double_line_breaks ])
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
	genre.to_json(:methods => [ :fics ])
end

get '/api/matchups' do
	Matchup.all.to_json(:relationships => { :characters => { :methods => [ :series ] } } )
end

get '/api/matchups/:id' do
	matchup ||= Matchup.get(params[:id]) || halt(404)
	matchup.to_json(:relationships => { :characters => { :methods => [ :series ] } } )
end

get '/api/series' do
	Series.all(:fic_series => FicSeries.all).to_json
end

get '/api/series/:id' do
	series ||= Series.get(params[:id]) || halt(404)
	series.to_json(:methods => [ :fics ])
end
