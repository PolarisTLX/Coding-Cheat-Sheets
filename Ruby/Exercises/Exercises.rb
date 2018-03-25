From Codecademy:

print "Integer please: "
user_num = Integer(gets.chomp)

if user_num < 0
  puts "You picked a negative integer!"
elsif user_num > 0
  puts "You picked a positive integer!"
else
  puts "You picked zero!"
end

NOTE the end !!!  (no curly braces {} )


UNLESS  instead of IF  :


problem = false
print "Good to go!" unless problem






is_marvel_gonna_keep_making_movies_forever = true

unless is_marvel_gonna_keep_making_movies_forever == false
  print "There will be more Chris' eventually"

 else
  print "Chris be looking for a job"

end




print "Thtring, pleathe!: "
user_input = gets.chomp
user_input.downcase!

if user_input.include? "s"
  user_input.gsub!(/s/, "th")
else
  puts "Nothing to do here!"
end

puts "Your string is: #{user_input}"




print "Type something!"

user_input = gets.chomp

user_input.downcase!

if user_input.include? "s"
  user_input.gsub!(/s/, "th")
  print user_input
  else
    print "'#{user_input}' Already Duckified!"
end
