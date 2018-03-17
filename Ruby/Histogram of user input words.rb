puts "Text please: "
text = gets.chomp

words = text.split(" ")
frequencies = Hash.new(0)   #NOTE  we put 0  in Hash.new()  so that we can perform +1 math on it
words.each { |word| frequencies[word] += 1 }
frequencies = frequencies.sort_by {|a, b| b }
frequencies.reverse!
frequencies.each { |word, frequency| puts word + " " + frequency.to_s }


=begin

Text please:
the rain in Spain falls mainly in the plain
in 2
the 2
plain 1
mainly 1
falls 1
Spain 1
rain 1

=end


NOTE in this version of the code above that they are list by frequency, the REVERSE order:

=begin

Text please:
i have a lovely bunch of coconuts i i i  lovely bunch
i 4
bunch 2
lovely 2
coconuts 1
of 1
a 1
have 1

=end



puts "Text please: "
text = gets.chomp

words = text.split(" ")
frequencies = Hash.new(0)
words.each { |word| frequencies[word] += 1 }
#frequencies = frequencies.sort_by {|a, b| b }
#frequencies.reverse!
frequencies.each { |word, frequency| puts word + " " + frequency.to_s }


=begin

Text please:
I have a lovely bunch of coconuts i i i lovely bunch
I 1
have 1
a 1
lovely 2
bunch 2
of 1
coconuts 1
i 3

=end
