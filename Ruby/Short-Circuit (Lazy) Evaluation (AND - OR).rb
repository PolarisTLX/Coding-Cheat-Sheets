#Short-circuit evaluation:
#Means that Ruby doesnt look at both expressions unless it has to;

#if it sees:

  false && true

#it stops reading as soon as it sees && because it knows false && anything must be false.


#EXAMPLE:

def a
  puts "A was evaluated!"
  return true
end

def b
  puts "B was also evaluated!"
  return true
end

puts a || b
puts "------"
puts a && b


#=>
# A was evaluated!
# true
# ------
# A was evaluated!
# B was also evaluated!
# true
