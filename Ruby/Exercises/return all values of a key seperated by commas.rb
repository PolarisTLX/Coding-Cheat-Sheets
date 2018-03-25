planets = {:earth => [:luna], :mars => [:deimos, :phobos, :othermoon], :jupiter => [:callisto, :io, :europa]}

Return the moons of :mars as a single string separated by a comma.
Result should be "deimos, phobos".


# WRONG:  
# my_string = ""
#
# planets[:mars].each do |item|
#     my_string.push("#{item}, ")
# end

planets[:mars].join(", ")
