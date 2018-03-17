ages = [23, 101, 7, 104, 11, 94, 100, 121, 101, 70, 44]

# Add your code below!
under_100 = Proc.new {|param| param < 100 }

puts ages.select(&under_100)

#=> [23, 7, 11, 94, 70, 44]
