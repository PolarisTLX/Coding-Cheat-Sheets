ENUMERABLE ITERATORS :
".each" / ".each_with_index",
".sort"
".count"
".include?"
".select"  (aka .filter in JS)
".map" / ".collect"
".reduce" / ".inject"

Less comonly used:
".all?"   #(see lower)
".any?"
".none?"
".find" / ".find_all"    (".find_all" & ".select" are kind of the same)

Even less common:
".group_by"
".grep"



Enumerable Iterators Quick Cheat Sheet :

".each returns" the original object it was called on because its really used for its side effects and not what it returns
".each_with_index" passes not just the current item but whatever position in the array it was located in.
".select" returns a new object (e.g. array) filled with only those original items where the block you gave it returned true
".map" returns a new array filled with whatever gets returned by the block each time it runs.
".reduce" / ".inject"  ...



".each"  :

.
.
.



".each_with_index"  :

Allows you to work through an enumrable collection
with logic used for the items AND for the index of the items in that collection.

Ex: Print every even word in an array of strings:

    my_array = ["Chicken", "Beef", "broth", "stew"]

    my_array.each_with_index do |item, index|
      print "#{item} " if index % 2 == 0
    end

    #=> Chicken broth



FILTERING ARRAYS with ".select" :
is the same as  .filter from JavaScript.

    my_array = [1,2,3,4,5,6,7,8,1000]

    my_array.select { |item| item%2 == 0 }
    #=> [2,4,6,8,1000]



COLLECT ITERATOR FOR ARRAYS with ".collect {...}" or ".map {...}" :
Similar to .map in JS

The collect method takes a code block  ( {...} ),
and applies the expression in the block to every element in an array.

    fibs = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55]

    doubled_fibs = fibs.collect { |n| n*2 }

    puts doubled_fibs
    # =>[2, 2, 4, 6, 10, 16, 26, 42, 68, 110]



Exersize / Quiz :
How do you check if every item in a hash fulfills a certain criteria?
.all method:

Passes each element of the collection to the given block. The method returns true if the block never returns false or nil. If the block is not given, Ruby adds an implicit block of {|obj| obj} (that is all? will return true only if none of the collection members are false or nil.)

%w{ant bear cat}.all? {|word| word.length >= 3}   #=> true
%w{ant bear cat}.all? {|word| word.length >= 4}   #=> false
[ nil, true, 99 ].all?

".any?"
".none?"
