people = {
 'fred' => {
 'name' => 'Fred Elliott',
 'age' => 63,
 'gender' => 'male',
 'favorite painters' => ['Monet', 'Constable', 'Da Vinci']
 },
 'janet' => {
 'name' => 'Janet S Porter',
 'age' => 55,
 'gender' => 'female'
 }
}

puts people['fred']['age']
#=> 63

puts people['fred']['favorite painters'].length
#=> 3
puts people['fred']['favorite painters'][0]
#=> Monet
puts people['fred']['favorite painters'][0].length
#=> 5  (5 letters in "Monet")
puts people['fred']['favorite painters'][0].join(", ")
#=> Monet, Constable, Da Vinci

puts people['janet']['gender']
#=> female

p people['janet']
#=> {"name"=>"Janet S Porter", "age"=>55, "gender"=>"female"}
