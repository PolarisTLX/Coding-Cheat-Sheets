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



USING "protected" instead of "private" :
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
