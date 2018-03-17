movies = {
  MonstersInc: 5
}

puts "What do you want to do?"
choice = gets.chomp

case choice.downcase
  when "add"
  	puts "Type in movie title to add:"
  	title = gets.chomp.to_sym

  	if movies[title] == nil
  		movies[title]
      else
      	puts "Error, that movie already exists!"
    end

  	puts "Now type the rating out of 5 stars:"
  	rating = gets.chomp.to_i
  	movies[title] = rating
  puts movies

  when "update"
		puts "What movie do you want to update?"
  	title = gets.chomp.to_sym

  	if movies[title] == nil
      puts "Error! That movie is not in the DB."
      else
      	puts "Ok, what rating would you like to give it?"
      	rating = gets.chomp.to_i
  			movies[title] = rating
    end


  when "display"

  	movies.each { |movie, rating|
      puts "#{movie}: #{rating}"
    }


  when "delete"

  	puts "Type in movie title to delete:"
  	title = gets.chomp.to_sym

    if movies[title] == nil
      puts "Error! That movie is not in the DB."
      else
      	movies.delete(title)
    end

  else
  	puts "Error!"
end
