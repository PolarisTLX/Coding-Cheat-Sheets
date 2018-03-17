Filter values of a hash by letters < "M" using a lambda :

crew = {
  captain: "Picard",
  first_officer: "Riker",
  lt_cdr: "Data",
  lt: "Worf",
  ensign: "Ro",
  counselor: "Troi",
  chief_engineer: "LaForge",
  doctor: "Crusher"
}
# Add your code below!
first_half = lambda { |key, value| value < "M" }

a_to_m = crew.select(&first_half)

puts a_to_m


#=>  {:lt_cdr=>"Data", :chief_engineer=>"LaForge", :doctor=>"Crusher"}
