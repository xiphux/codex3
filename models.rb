class Author
	include DataMapper::Resource
	
	property :id,	   Serial
	property :name,    String, :length => 255
	property :email,   String
	property :website, String
	
	has n, :author_fics
	has n, :fics, :through => :author_fics
end

class AuthorFic
	include DataMapper::Resource
	
	storage_names[:default] = 'authors_fics'
	
	belongs_to :author, :key => true
	belongs_to :fic, :key => true
end

class Chapter
	include DataMapper::Resource
	
	property :id,     Serial
	property :number, Integer
	property :title,  String, :length => 255
	#property :file,   String, :length => 255
	property :data,   Text, :length => 2**32-1
	
	property :wrapped, Boolean
	property :no_paragraph_spacing, Boolean
	property :double_line_breaks, Boolean
	
	belongs_to :fic
end

class Character
	include DataMapper::Resource
	
	property :id,     Serial
	property :name,   String, :length => 255
	
	belongs_to :series
	
	has n, :character_matchups
	has n, :matchups, :through => :character_matchups
end

class CharacterMatchup
	include DataMapper::Resource
	
	storage_names[:default] = 'characters_matchups'
	
	belongs_to :character, :key => true
	belongs_to :matchup, :key => true
end

class Fic
	include DataMapper::Resource
	
	property :id,    Serial
	property :title, String, :length => 255
	
	#has 1, :prequel, self, :child_key => [ :prequel_id ]
	#has 1, :main_story, self, :child_key => [ :main_story_id ]
	
	has n, :author_fics
	has n, :authors, :through => :author_fics
	
	has n, :fic_genres
	has n, :genres, :through => :fic_genres
	
	has n, :fic_series
	has n, :series, :through => :fic_series
	
	has n, :fic_matchups
	has n, :matchups, :through => :fic_matchups
	
	has n, :chapters
end

class FicGenre
	include DataMapper::Resource
	
	storage_names[:default] = 'fics_genres'
	
	belongs_to :fic, :key => true
	belongs_to :genre, :key => true
end

class FicMatchup
	include DataMapper::Resource
	
	storage_names[:default] = 'fics_matchups'
	
	belongs_to :fic, :key => true
	belongs_to :matchup, :key => true
end

class FicSeries
	include DataMapper::Resource
	
	storage_names[:default] = 'fics_series'
	
	belongs_to :fic, :key => true
	belongs_to :series, :key => true
end

class Genre
	include DataMapper::Resource
	
	property :id,    Serial
	property :name,  String, :length => 255
	
	has n, :fic_genres
	has n, :fics, :through => :fic_genres
end

class Matchup
	include DataMapper::Resource
	
	property :id,    Serial
	
	has n, :character_matchups
	has n, :characters, :through => :character_matchups
	
	has n, :fic_matchups
	has n, :fics, :through => :fic_matchups
end

class Series
	include DataMapper::Resource
	
	property :id,   Serial
	property :title, String, :length => 255
	
	has n, :characters
	
	has n, :fic_series
	has n, :fics, :through => :fic_series
end