Although creating your own exceptions and exception handlers is useful for resolving error situations,
SOMETIMES YOU WANT to be able to break out of a thread of execution (say, a loop) during normal operation in
a similar way to an exception, but without actually generating an error. Ruby provides two methods, catch
and throw , for this purpose.


catch and throw work in a way a little reminiscent of raise and rescue ,
BUT catch and throw work with symbols rather than exceptions.


THEY’RE DESIGNED TO BE USED IN SITUATIONS WHERE NO ERROR HAS OCCURRED,
but being able to escape quickly from a nested loop, method call, or similar, is necessary.


The following example creates a block using catch . The catch block with the :finish symbol as an
argument will immediately terminate (and move on to any code after that block) if throw is called with the
:finish symbol :


    catch(:finish) do
       1000.times do
         x = rand(1000)
         throw :finish if x == 123
       end

       puts "Generated 1000 random numbers without generating 123!"
       # SEE FLAW BELOW!!
    end

Within the catch block you generate 1,000 random numbers, and if the random number is ever 123, you
immediately escape out of the block using throw :finish.

FLAW IN CODE ABOVE: However, if you manage to generate 1,000 random numbers without generating the number 123, the loop and the block complete, and you see the message.




CATCH AND THROW DON’T HAVE TO BE DIRECTLY IN THE SAME SCOPE :
throw works from methods called from within a catch block:

    def generate_random_number_except_123
       x = rand(1000)
       throw :finish if x == 123
    end
    catch(:finish) do
       1000.times { generate_random_number_except_123 }
       puts "Generated 1000 random numbers without generating 123!"
    end

This code operates in an identical way to the first.

But the throw is held inside a seperate function (named "generate_random_number_except_123") that is called in the code block inside the loop, that is inside the catch.

When throw can’t find a code block using :finish in
its current scope, it jumps back up the stack until it can.
