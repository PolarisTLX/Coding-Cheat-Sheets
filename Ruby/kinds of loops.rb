for i in 1..50
  print i
end

# same as:

for i in (1..50)
  print i
end



i = 1
while i < 51
  print i
  i += 1
end



i = 1
until i > 50
  print i
  i += 1
end




i = 0
loop do
  i += 1
  print i
  break if i == 50
end




Skip certain numbers with "next"

i = 20
loop do
  i -= 1
  next if i % 2 == 1
  print "#{i} "
  break if i <= 0
end




30.times{print "Ruby!"}


30.times do
  print "Ruby!"
end



break will stop the current loop. Often used with an if to specify under what conditions to do that.

next will jump to the next iteration. Also usually used with an if statement.

redo will let you restart the loop (without evaluating the condition on the first go-through), again usually with some condition

retry works on most loops (not while or until) similarly to redo but it will re-evaluate the condition before running through the loop again (hence try instead of do).

NOTE: Do NOT use return to exit a loop, since that will exit the whole method that contains it as well!
