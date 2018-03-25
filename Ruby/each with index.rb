Method  .each_with_index

Allows you to work through an enumrable collection
with logic used for the items AND for the index of the items in that collection.

Ex: Print every even word in an array of strings:

    my_array = ["Chicken", "Beef", "broth", "stew"]

    my_array.each_with_index do |item, index|
      print "#{item} " if index % 2 == 0
    end

    #=> Chicken broth
