    class Car
      def initialize(make, model)
        @make = make
        @model = model
      end
    end

    kitt = Car.new("Pontiac", "Trans Am")



We start our class definition off with a method called initialize.
You can think of initialize as the function that "boots up" each object the class creates.
So def initialize  only runs when there is a  Car.new("...")  called.
And it runs each time Car.new is performed each time there is a new instance.



    class Person
      # Set your class variable to 0 on line 3
      @@people_count = 0

      def initialize(name)
        @name = name
        # Increment your class variable on line 8
        @@people_count += 1
      end

      def self.number_of_instances
        # Return your class variable on line 13
        @@people_count
      end
    end

    matz = Person.new("Yukihiro")   # this creates the first instance and runs "initialize"
    dhh = Person.new("David")       # this creates a 2nd instance and runs "initialize" again


    puts "Number of Person instances: #{Person.number_of_instances}"
    #=>  2


The "self."  in def self.number_of_instances
is so that you can call the class itself, as in  "#{Person.number_of_instances}"
instead of having to do  something like "#{matz.number_of_instances}"

  # this will not work because it can't use the method  "self.number_of_insance"
  puts "matz.number_of_instances: #{matz.number_of_instances}"
  #=> blank
  # would have to create a seperate method without the "self...."





CLASS METHODS (this might not be in the best place) :
http://www.eriktrautman.com/posts/ruby-explained-classes

There are two good times to use class methods: when you're building new instances of a class that have a bunch of known or "preset" features, and when you have some sort of utility method that should be identical across all instances and won't need to directly access instance variables.

The first case is called a factory method, and is designed to save you from having to keep passing a bunch of parameters manually to your initialize method:

    class Viking
        def initialize(name, health, age, strength)
            #... set variables
        end
        def self.create_warrior(name)
            age = rand * 20 + 15   # remember, rand gives a random 0 to 1
            health = [age * 5, 120].min
            strength = [age / 2, 10].min
            Viking.new(name, health, age, strength)  # returned
        end
    end

The second case above is more mundane. Often, there are things you need all Vikings to "know" or be able to do:

    class Viking
      ...
      def self.random_name      # useful for making new warriors!
          ["Erik","Lars","Leif"].sample
      end
      def self.silver_to_gold(silver_pieces)
          silver_pieces / 10
      end
      class << self           # The less common way
          def gold_to_silver(gold_pieces)
              gold_pieces * 10
          end
      end
  end


Quick Basics

-CLASSES are useful to use when you want to give methods to your data or have multiple instances of your data

-CLASS METHODS have access to other class methods and class variables but dont have access to instance methods or instance variables

-INSTANCE METHODS can call other instance methods, instance variables, class methods, or class variables

If you are thinking that class variables seem pretty similar to constants, they are only similar in that all instances have access to them. If youve got something that will never, CAN never change, use a constant. If you might ever change it, stick with a class variable. At the very least, it makes your code much more legible.


DIFFERENCE BETWEEN A MODULE AND A CLASS:
Basically, a class can be instantiated but a module cannot. A module will never be anything other than a library of methods. A class can be so much more. If you need to instantiate something or otherwise have it exist over time, thats when you need to use a class instead of a module.





INHERITANCE :

In the example below we have defined a class, ApplicationError,
as well as a SuperBadError class that inherits from ApplicationError:
"class SuperBadError < ApplicationError"


    class ApplicationError
      def display_error
        puts "Error! Error!"
      end
    end

    class SuperBadError < ApplicationError
      # optional additional code/methods
      # that would be specific only to SuperBadError
      # ....
    end

    err = SuperBadError.new
    err.display_error
    #=> Error! Error!


Note that we dont define the display_error method in the body of SuperBadError,
but it will still have access to that method via inheritance.


OVERIDING :

If you want your instance of a class to behave slightyl differently than the class it derived / inherited from.
You can simply re-define a method in your new class that will override the original method of the same defined in the original parent class.
Only the child class will behave in this new way.

Example:

    class Creature
      def initialize(name)
        @name = name
      end

      def fight
        return "Punch to the chops!"
      end
    end

    # Add your code below!
    class Dragon < Creature
      def fight
        return "Breathes fire!"
      end
    end



ADDING TO A METHOD IN A PARENT CLASS with "super" (instead of completely overriding) :


    class Person
      def initialize(name)
        @name = name
      end

      def name
        return @name
      end
    end

    class Doctor < Person
      def name
        "Dr. " + super   #<-- adding to what is returned from the parent class
      end
    end

    my_friend = Person.new("Mark")
    my_docter = Doctor.new("Hoffsteader")
    puts my_friend.name #=> Mark
    puts my_docter.name #=> Dr. Hoffsteader


MULTIPLE INHERITANCE IS NOT ALLOWED IN RUBY :

Some languages allow a class to have more than one parent,
which is a model called multiple inheritance.
This can get really ugly really fast, which is why Ruby disallows it.

    class Dragon < Creature; end
    class Dragon < Person; end

    #=> Error: superclass mismatch for class Dragon




USERNAME AND PASSWORD EXAMPLE:

    class Computer

      @@users = {}

      def initialize(username, password)
        @username = username
        @password = password
        @files = {}
        @@users[username] = password
      end
    end

@@users[username] = password is set so that your @@users hash keeps usernames as keys
with each usernames password as the associated value.





PRIVATE METHODS IN CLASSES :

'You should change the default thought in your head
from:  "everything is accessible, what do I need to hide?"
to:  "everything should be hidden, what do I absolutely need to make externally available?"

That principle will take you far, especially when designing things like APIs that will be used by other programs. The more you make available to people, the harder it will be later on to hide it again.'


(This is an example of encapsulation in Ruby, see interview file for more details)

(NOTE: Some Ruby developers do not believe marking methods as private or protected provides any
significant value and that, indeed, it prevents developers from having free and open access to their code. We’re
not going to push a particular opinion here, but you may wish to avoid using these features until you have a
strong opinion either way. )


    class ClassName
      # Some class stuff
      public
      def public_method
        # public_method stuff
      end
    end

Now everything after the public keyword through the end of the class definition
will now be public unless we say otherwise.
NOTE: Things are public by default. The "public" is really just added for readibility I think.
(Well say otherwise in the next exercise.)



private methods are just that: they are private to the object where they are defined.
This means you can only call these methods from other code inside the object.
Another way to say this is that the method cannot be called with an explicit receiver.

    class ClassName
      # Some class stuff

      public
      # Public methods go here
      def public_method; end

      private
      # Private methods go here
      def private_method; end
    end



Example:

    class Person
      def initialize(name, age)
        @name = name
        @age = age
      end

      public    # This method can be called from outside the class.

      def about_me
        puts "I'm #{@name} and I'm #{@age} years old!"
      end

      private   # This method can't!

      def bank_account_number
        @account_number = 12345
        puts "My bank account number is #{@account_number}."
      end
    end

    eric = Person.new("Eric", 26)
    eric.about_me
    #=> I'm Eric and I'm 26 years old!

    eric.bank_account_number
    #=> Error: private method `bank_account_number' called



ALTERNATIVE METHOD TO DENOTING PRIVATE/PUBLIC CLASS METHODS :
with adding on the last line:
    private :method1_to_be_private, :method2_to_be_private, ...


    class Person
     def anyone_can_access_this; ...; end
     def this_is_private; ...; end
     def this_is_also_private; ...; end
     def another_public_method; ...; end
    private :this_is_private, :this_is_also_private
    end


PROTECTED :

we cant make our #take_damage method private because otherwise we could only call it on the specific viking who is DOING the attacking. We want to call it on the RECIPIENT of the attack (remember, private methods can only be called from within the same instance).

Since we dont want ".take_damage" to be visible to anyone on the command line but we DO want it to be visible to the methods inside other instances of Viking, we call that protected.  protected provides most of the privacy of private but lets the methods inside other instances of the same class or its descendents also access it:

    class Viking < Person
        ...
        def attack(recipient)
            if recipient.dead
                puts "#{recipient.name} is already dead!"
                return false
            end
            damage = (rand * 10 + 10).round(0)
            # rand is the keyword to generate a random number in Ruby?
            recipient.take_damage(damage)  # `take_damage` called on `recipient`!
        end
        protected
            def take_damage(damage)
                self.health -= damage
                puts "Ouch! #{self.name} took #{damage} damage and has #{self.health} health left"
                die if @health <= 0
                # `die` called from within the same object as take_damage was (the `recipient` as well!)
            end
        private
            def die
                puts "#{self.name} has been killed :("
                self.dead = true  # assume we've defined a `dead` instance variable
            end
    end

    10.times { oleg.attack(sten) }
    # Ouch! Sten took 19 damage and has 101 health left
    # Ouch! Sten took 10 damage and has 91 health left
    # Ouch! Sten took 13 damage and has 78 health left
    # Ouch! Sten took 17 damage and has 61 health left
    # Ouch! Sten took 15 damage and has 46 health left
    # Ouch! Sten took 11 damage and has 35 health left
    # Ouch! Sten took 14 damage and has 21 health left
    # Ouch! Sten took 14 damage and has 7 health left
    # Ouch! Sten took 18 damage and has -11 health left
    # Sten has been killed :(
    # Sten is already dead!


More on USING "protected" instead of "private" :
  Ruby supports a third form of encapsulation (other than public and private ) called protected.
  That makes a method private, but within the scope of a class rather than within a single object.

Example on page 124 of Beginning Ruby 3rd Edition.
http://file.allitebooks.com/20160718/Beginning%20Ruby.pdf






ALTERNATIVE TO WRITING METHODS TO ACCESS ATTRIBUTES :
attr_reader, attr_writer

We saw in the lesson on classes that Ruby needs methods in order to access attributes. For instance, if we want to access a @name instance variable, we had to write something like

    def name
      @name
    end


Well, no longer! We can use attr_reader to access a variable and attr_writer to change it. If we write

    class Person
      attr_reader :name
      attr_writer :name
      def initialize(name)
        @name = name
      end
    end


Ruby does something like this for us automatically:

    def name
      @name
    end

    def name=(value)
      @name = value
    end


Now we can read and write variables as we please! We just pass our instance variables (as symbols) to attr_reader or attr_writer.

(That "name=" might look funny, but youre allowed to put an "=" sign in a method name.
Thats just a Ruby convention saying, "hey, this method sets a value!")


So this:

    class Person
      def initialize(name, job)
        @name = name
        @job = job
      end

      def name   # this method is completed replaced
        @name
      end

      def job=(new_job)   # also this method is completed replaced
        @job = new_job
      end

    end

Can be re-written as this:

    class Person
      def initialize(name, job)
        @name = name
        @job = job
      end

      attr_reader :name
      attr_writer :job

    end



BOTH READ AND WRITE FOR THE SAME VARABLE :
attr_accessor

If we want to both read and write a particular variable,
theres an even shorter shortcut than using attr_reader and attr_writer.
We can use attr_accessor to make a variable readable and writeable in one fell swoop.

    class Person
      attr_reader :name
      # attr_reader :job
      # attr_writer :job
      attr_accessor :job

      def initialize(name, job)
        .
        .

If you want to grant read/write ability to several variables,
(or just read to several vaiables, or just write to several variables)
you can just seperate then with comas "," like so:

    attr_reader :job, :name, :age, :address
    OR
    attr_writer :job, :name, :age, :address
    OR
    attr_accessor :job, :name, :age, :address



BANKING CHECK FOR PIN EXAMPLE :

    class Account
      attr_reader :name, :balance
      def initialize(name, balance=100)
        @name = name
        @balance = balance
      end

      def display_balance(pin_number)
        puts pin_number == pin ? "Balance: $#{@balance}." : pin_error
      end

      def withdraw(pin_number, amount)
        if pin_number == pin
          @balance -= amount
          puts "Withdrew #{amount}. New balance: $#{@balance}."
        else
          puts pin_error
        end
      end

      private

      def pin
        @pin = 1234
      end

      def pin_error
        "Access denied: incorrect PIN."
      end
    end

    my_account = Account.new("Eric", 1_000_000)
    my_account.withdraw(11, 500_000)
    my_account.display_balance(1234)
    my_account.withdraw(1234, 500_000)
    my_account.display_balance(1234)



NESTED CLASSES -  "Class::NestedClass"

class Drawing
  class Line
  end

  class Circle
  end
end

You access class Circle with  Drawing::Circle
