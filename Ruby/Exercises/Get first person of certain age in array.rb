ages = [[:frank, 42], [:sue, 77], [:granny, 77]]

Get the first person from the ages array that is 77 years old.
The result should be [:sue, 77]

ages.find do |item|
  item[1] == 77
end
