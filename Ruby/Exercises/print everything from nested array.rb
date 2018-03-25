people = [["Lebron", "cool dude"], ["Bieber", "jerk face"]]

Iterate through the people array and print the following sentences:

Lebron is a cool dude Bieber is a jerk face

people.each do |item|
  print item[0] + " is a " + item[1] + " "
end
