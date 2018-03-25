What does the following code print.

    cool = "Beans"
    def dinner_plans()
      puts cool
    end

    dinner_plans()

This raises an error because the cool variable is defined outside the dinner_plans() method.




What does the following code print?

    def blah()
      my_var = "my_var has been defined"
    end

    puts my_var

This code raises an error because the scope of my_var is local to the blah() method. In other words, the my_var variable can be used within the blah() method, but it cannot be used anywhere outside of the method.




What does the following code print?

    def cray()
      lyric = "Stuff is cray cray"
      puts lyric
    end

    cray()


#=> "Stuff is cray cray".

The lyric variable is defined in the cray() method and puts() can access the variable within the cray() method.
