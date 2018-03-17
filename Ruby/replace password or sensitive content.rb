puts "Text to search through: "
text = gets.chomp
puts "Word to redact: "
redact = gets.chomp

words = text.split(" ")

words.each do |word|
  if word != redact
    print word + " "
  else
    print "REDACTED "
  end
end


Text to search through:
this is my password
Word to redact:
password
this is my REDACTED




built tep by step: (prob same thing)

puts "Type something!"

text = gets.chomp

words = text.split(" ")
#print words

puts "Type something else!"
redact = gets.chomp

words.each do |word|
  if word == redact
    print "REDACTED "
  else
    print word + " "
  end
end
