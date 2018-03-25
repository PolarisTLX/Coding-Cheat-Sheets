CLASS METHODS vs INSTANCE METHODS :

Example of 2 instance methods:

class Square

   def initialize(side_length)   #<-- instance method
     @side_length = side_length
   end

   def area                      #<-- instance method
     @side_length * @side_length
   end

end

When you create a square with :

    my_square = Square.new(10)
    # this triggers/uses the  .initialize mehod

You can then use :

    my_square.area


Both methods,  .area, and .initialize are instance methods.
These methods are available to all objects of class Square.


*** Now how about a method on the class itself? ***
(This is different than a class "variable" (with @@))


    class Square

      def selt.test_method   #<-- this a class method
        puts "Hello from the Square class!"
      end

      def test_method
        puts "Hello from an instance of class Square!"
      end

    end

    Square.test_method    #<-- calling a class method
    Square.new.test_method   #<-- calling a instance method

    # Hello from the Square class!
    # Hello from an instance of class Square!


Both methods are named "test_method",
But self.  denotes a class method.
This method can be called directly on the class, it does not need to be called on an instance of the class.

THIS IS USEFUL TO IMPLEMENT A COUNTER OF HOW MANY INSTANCES OF A CLASS THERE ARE,
+ HAVE A CONVENIENT WAY TO CALL IT

Example:

    class Square

      # when any new instance of this class is created
      def initialize
        # first, if this has not been done yet,
        # the first initialize has to create the variable and set to = 1
        if defined?(@@number_of_square_instances)
          @@number_of_square_instances += 1
        else
          @@number_of_square_instances = 1
        end
      end

      def self.count  # class method to call to find out how many there are
        @@number_of_square_instances
      end
    end


    a = Square.new
    puts Square.count #=> 1
    b = Square.new
    puts Square.count #=> 2
    c = Square.new
    puts Square.count #=> 3
