UGLY / VERBOSE  If / Elsif/ Else code:

    puts "What's your favorite language?"
    language = gets.chomp

    if language == "Ruby"
      puts "Ruby is great for web apps!"
    elsif language == "Python"
      puts "Python is great for science."
    elsif language == "JavaScript"
      puts "JavaScript makes websites awesome."
    elsif language == "HTML"
      puts "HTML is what websites are made of!"
    elsif language == "CSS"
      puts "CSS makes websites pretty."
    else
      puts "I don't know that language!"
    end


Cleaned up with Case / when code:

    puts "What's your favorite language?"
    language = gets.chomp

    case language
      when "Ruby" then puts "Ruby is great for web apps!"
      when "Python" then puts "Python is great for science."
      when "JavaScript" then puts "JavaScript makes websites awesome."
      when  "HTML" then puts "HTML is what websites are made of!"
      when "CSS" then puts "CSS makes websites pretty."
      else puts "I don't know that language!"
    end


# IMPORTANT NOTE:   only one “case” can be matched in Ruby, as execution
# does not continue through the list of options once a match has been made



SHORTCUT WHEN USING CASE FOR SETTING VALUE TO A VARIABLE :

    fruit = "orange"
    case fruit
     when "apple"
     color = "green"
     when "banana"
     color = "yellow"
     else
    color = "unknown"
     end

  Can be made simpler like so:

    fruit = "orange"
    color = case fruit
    when "apple"
    "green"
    when "banana"
    "yellow"
    Else    # capital E ???
    "unknown"
    end


OTHER EXAMPLES :


case language
  when "JS"
    puts "Websites!"
  when "Python"
    puts "Science!"
  when "Ruby"
    puts "Web apps!"
  else
    puts "I don't know!"
end


But you can fold it up like so:

case language
  when "JS" then puts "Websites!"
  when "Python" then puts "Science!"
  when "Ruby" then puts "Web apps!"
  else puts "I don't know!"
end



Example: prompt user for an answer:

puts "Hello there!"
greeting = gets.chomp.downcase

# Add your case statement below!
case greeting
  when "english" then puts "Hello!"
  when "french" then puts "Bonjour!"
  when "german" then puts "Guten Tag!"
  when "finnish" then puts "Haloo!"
  else puts "I don't know that language"
end
