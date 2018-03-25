SCOPES OF VARIABLES :


some variables start with $, @, or @@?
This helps mark them as global, instance, and class variables (respectively).

NO SYMBOL : basic variable called a "local variable"

It can be used only in the same place it is defined.
If you jump to using an object’s methods or a separate method of your own,
the variable x doesn’t come with you.
It’s considered to be local in scope.

ex:

    x = 10
    puts x
    #=> 10

    def basic_method
      x = 50
    end

    basic_method #call the method to set x = 50
    puts x
    #=> 10   #still 10 because it is a seperate variable, but both called "x", one scope can't change the other in the other scope.



 $ : Global Variables - are available everywhere (global variables),

ex:
    x = 10
    $x = 25  # (they are difference variables)

    def basic_method
      $x = 50
    end

    puts x #=> 10
    puts $x #=> 25
    basic_method #call the method to set x = 50
    puts x #=> 10
    puts $x #=> 50  (this one has been affected by the method.)



 @ : Instance variables / object variables:
        variables that are only available to particular objects / instances of a class.
        an instance variable is accessible from any other method inside that object.


        a = Square.new(10)
        b = Square.new(5)
        puts a.area  #=> 100
        puts b.area  #=> 25

        The results are different, even though the code to work out the area in both cases is @side_length * @side_length.
        This is because @side_length is an instance variable associated only with the current object or instance.

@@ : Class variables:
        and variable that are members of an entire certain class,
        they are available to all instances/objects of that class, as opposed to just specific instances/objects of that class.
        useful for storing information relevant to all objects of a certain class.

        (NOTE: In recent years, class variables have begun to fall out of favor among professional Ruby developers.
        Fashions come and go in the Ruby world but ultimately enable developers to work together more smoothly.
        Since all classes are themselves objects within Ruby, it has become more popular to simply use object variables
        within the context of class methods in order to keep things simple.  )


$ TO MAKE ANY VARIABLE GLOBAL :
It sounds like adding a $ in front of a variable makes everything in your ruby program have access to that variable at all times.
This is also discouraged and should only be used lightly?

Global variables can be declared in two ways:
The first is one thats already familiar to you: you just define the variable outside of any method or class, and voilà! Its global.
If you want to make a variable global from inside a method or class, just start it with a $, like so: $matz.



Example of Global Variable :

    class MyClass
      my_variable = "Hello!"
    end

    puts my_variable
    #=> ERROR! undefined local variable or method

Now with the $ added (must be in both locations!!):

    class MyClass
      $my_variable = "Hello!"
    end

    puts $my_variable
    #=> Hello!



Example with all parts :

    class Computer
      $manufacturer = "Mango Computer, Inc."
      @@files = {hello: "Hello, world!"}
      files2 = {hello2: "No @@ or $ in front of this variable!"}

      def initialize(username, password)
        @username = username
        @password = password
      end

      def current_user
        @username
        varInsideClass = "I'm inside a class!"
      end

      def self.display_files
        @@files
      end
    end

    @@outsideVar = "this would not normally be outside a class"
    @SingleAtoutsideVar = "this has only 1 @ and is outside any class."

    # Make a new Computer instance:
    hal = Computer.new("Dave", 12345)

    puts "Current user: #{hal.current_user}"
    # @username belongs to the hal instance.

    puts "Manufacturer: #{$manufacturer}"
    # $manufacturer is global! We can get it directly.

    # puts "files2 does not have a $: #{files2}"
    # Error: undefined local variable or method `files2'
    # files2 is not global! We cannot get it directly.

    puts "variable inside Current user: #{hal.files2}"
    # This doesnt make sense, the "." is to call a method,  in this case that is inside the class. You can only have a method return a certain variable if you wish.

    # puts "Files: #{@@files}"
    # Error: uninitialized class variable @@files in Context
    # @@files is a class variable, not a global variable, so we don't have direct acces to it!

     puts "Var with @@, outside any class: #{@@outsideVar}"
    # The @@ don't actually do anything.
    # But the variable is declared outside of anything, so we do have access to it.

    puts "Var with a single @, outside any class: #{@SingleAtoutsideVar}"

    puts "Files: #{Computer.display_files}"
    # @@files belongs to the Computer class.
