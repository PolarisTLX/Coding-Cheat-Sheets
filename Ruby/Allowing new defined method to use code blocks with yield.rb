Some methods allow use of code blocks ( {...} ),
While others dont.

Thats because methods that accept blocks
have a way of transferring control from the calling method
to the block and back again.

We can build this ability into our defined methods by using the "yield" keyword:


    def block_test
      puts "We're in the method!"
      puts "Yielding to the block..."
      yield
      puts "We're back in the method!"
    end

    block_test { puts ">>> We're in the block!" }

    We're in the method!
    Yielding to the block...
    >>> We're in the block!
    We're back in the method!
