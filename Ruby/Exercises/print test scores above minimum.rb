test_scores = [["jon", 99], ["sally", 65], ["bill", 85]]

Create an array of all students with test scores greater than 80.
The result should be [["jon", 99], ["bill", 85]].

test_scores.each do |item|
  print item if item[1] > 80
end
