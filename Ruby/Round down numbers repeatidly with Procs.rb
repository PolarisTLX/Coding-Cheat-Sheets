floats = [1.2, 3.45, 0.91, 7.727, 11.42, 482.911]
# Write your code below this line!
round_down = Proc.new { |n| n.floor }


# Write your code above this line!
ints = floats.collect(&round_down)
print ints
#=> [1, 3, 0, 7, 11, 482]


PROCS (saved blocks) with Proc.new + "&" :

blocks of code are one of the only non-object things in Ruby.
But sometimes you want to re-use the same block and not write it / repeat it several times.

You can save a block into a "proc".
Procs are full-fledged objects, so they have all the powers and abilities of objects. (Blocks do not.)

format:

    proc_name = Proc.new { |n| ... code block you want saved ... }
    #OR
    proc_name = Proc.new do |n|
      ...
      code block you want saved
      ...
    end

    then call it as so:
    action array.method(&proc_name)



Example:

    multiples_of_3 = Proc.new do |n|
      n % 3 == 0
    end

    print (1..100).to_a.select(&multiples_of_3)
    #=> [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48, 51, 54, 57, 60, 63, 66, 69, 72, 75, 78, 81, 84, 87, 90, 93, 96, 99]



# NOTE does not need to be an array, but is most likely place to consider using a proc
