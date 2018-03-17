def query
  print "Type something!"
  user_input = gets.chomp
end

query

#if user_input == ""
until user_input != ""
  query
end

user_input.downcase!

if user_input.include? "s"
  user_input.gsub!(/s/, "th")
  print user_input
  else
    puts "'#{user_input}' Already Duckified!"
end
