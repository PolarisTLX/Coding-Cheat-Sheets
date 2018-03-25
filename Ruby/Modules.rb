There are lots and lots of Ruby tools you might want to use, but it would clutter the interpreter to keep them around all the time. For that reason, we keep a bunch of them in modules and only pull in those module toolboxes when we need the constants and methods inside!

You can think of modules as being very much like classes, only modules cant create instances and cant have subclasses. Theyre just used to store things!


Modules are super easy to make! You just use the module keyword, like so:

module ModuleName
  # Bits 'n pieces
end


It doesnt make sense to include variables in modules, since variables (by definition) change (or vary). Constants, however, are supposed to always stay the same, so including helpful constants in modules is a great idea.

Ruby constants are written in ALL_CAPS and are separated with underscores if there is more than one word.



namespacing, and it's how Ruby doesn't confuse Math::PI and Circle::PI.

See that double colon we just used? That's called the scope resolution operator, which is a fancy way of saying it tells Ruby where you're looking for a specific bit of code. If we say Math::PI, Ruby knows to look inside the Math module to get that PI, not any other PI (such as the one we created in Circle).


Some modules, like Math, are already present in the interpreter. Others need to be explicitly brought in, however, and we can do this using require. We can do this simply by typing

require 'module'

We can do more than just require a module, however. We can also include it!

Any class that includes a certain module can use those modules methods!

A nice effect of this is that you no longer have to prepend your constants and methods with the module name. Since everything has been pulled in, you can simply write PI instead of Math::PI.




MIXIN with ("nicludes")- MIX TOGETHER THE BEHAVIORS OF A class AND A module :

When a module is used to mix additional behavior and information into a class, its called a mixin. Mixins allow us to customize a class without having to rewrite code!

mixins can give us the ability to mimic inheriting from more than one class:
by mixing in traits from various modules as needed, we can add any combination of behaviors to our classes we like!

Example - we define the jump method in the Action module, then mix it into the Rabbit and Cricket classes :

    module Action
      def jump
        @distance = rand(4) + 2
        puts "I jumped forward #{@distance} feet!"
      end
    end

    class Rabbit
      include Action
      attr_reader :name
      def initialize(name)
        @name = name
      end
    end

    class Cricket
      include Action
      attr_reader :name
      def initialize(name)
        @name = name
      end
    end

    peter = Rabbit.new("Peter")
    jiminy = Cricket.new("Jiminy")

    peter.jump
    jiminy.jump

    #=> I jumped forward 3 feet!
    #   I jumped forward 2 feet!


EXTENDS vs INCLUDES :

Whereas include mixes a module''s methods in at the instance level
(allowing instances of a particular class to use the methods),
the extend keyword mixes a module''s methods at the class level.
This means that class itself can use the methods,
as opposed to (just?) instances of the class.

Example: # ThePresent has a .now method that we'll extend to TheHereAnd

    module ThePresent
      def now
        puts "It's #{Time.new.hour > 12 ? Time.new.hour - 12 : Time.new.hour}:#{Time.new.min} #{Time.new.hour > 12 ? 'PM' : 'AM'} (GMT)."
      end
    end

    class TheHereAnd
      extend ThePresent
    end

    TheHereAnd.now
    #=> It's 2:04pm (GMT)
