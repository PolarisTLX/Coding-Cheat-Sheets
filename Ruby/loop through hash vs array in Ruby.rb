friends = ["Milhouse", "Ralph", "Nelson", "Otto"]

friends.each { |x| puts "#{x}" }


family = { "Homer" => "dad",
  "Marge" => "mom",
  "Lisa" => "sister",
  "Maggie" => "sister",
  "Abe" => "grandpa",
  "Santa's Little Helper" => "dog"
}

family.each { |x, y| puts "#{x}: #{y}" }


better example:


secret_identities = {
  "The Batman" => "Bruce Wayne",
  "Superman" => "Clark Kent",
  "Wonder Woman" => "Diana Prince",
  "Freakazoid" => "Dexter Douglas"
}

secret_identities.each do | public, real|
  puts "#{public}: #{real}"
end




lunch_order = {
  "Ryan" => "wonton soup",
  "Eric" => "hamburger",
  "Jimmy" => "sandwich",
  "Sasha" => "salad",
  "Cole" => "taco"
}

lunch_order.each do | name, food|
  puts "#{food}"
end

OR (just grab the values)

lunch_order.values.each { |food| puts food }

(.values creates an array of all the values, you then loop through that array with .each)
