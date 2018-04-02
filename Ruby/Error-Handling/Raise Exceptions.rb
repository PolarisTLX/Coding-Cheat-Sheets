In Ruby, exceptions are packaged into objects of class Exception or one of Exception ’s many subclasses.

Ruby has about 30 main predefined exception classes that deal with different types of errors, such as
NoMemoryError , StandardError , RuntimeError , SecurityError , ZeroDivisionError , and NoMethodError .

You might have already seen some of these in error messages while working in irb.

For example:

irb(main):001:0> puts 10 / 0

  #=> ZeroDivisionError: divided by 0
   #       from (irb):1:in `/'
   #       from (irb):1


This error message shows that an exception of type ZeroDivisionError has been raised, because you
attempted to divide ten by zero.



RAISE YOUR OWN EXCEPTIONS :

You can raise exceptions from your own code too. You do this with the raise method and by using an existing exception class, or by creating one of your own that inherits from the Exception class.

Example:


    class Person
      def initialize(name)
        raise ArgumentError, "No name present" if name.empty?
      end
    end

If you create a new object from Person and supply a blank name, an exception will be raised:

    fred = Person.new('')
    #=> ArgumentError: No name present


This, ArgumentError, is one of the standard exception classes in Ruby. It is used when the arguments provided to a method are fatally flawed. You can use this class as an exception if bad data is supplied to a method of your own.


NOTE: You can call raise with no arguments at all, and a generic RuntimeError exception will be raised.
This is not good practice, though, as the exception will have no message or meaning along with it. Always
provide a message and a class with raise , if possible.



CREATE YOUR OWN TYPE OF EXCEPTION :

you could create your own type of exception if you wanted to. For example:

    class BadDataException < RuntimeError
    end

    class Person
       def initialize(name)
           raise BadDataException, "No name present" if name.empty?
       end
    end


This time you’ve created a BadDataException class inheriting from Ruby’s standard RuntimeError
exception class.
