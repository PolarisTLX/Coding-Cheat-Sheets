Content largely from The Odin Project "Ruby building blocks" which incorporates several sources such as Codecademy &  from book "Beginning Ruby: From Novie to Professional"


SPECIAL ATTRIBUTES ABOUT RUBY :

  Almost everything in Ruby is an "object".
  Pretty much everything else is a method

  To see it wholistically:
  Everything in Ruby is an Object,
  every object has a class,
  and being a part of that class gives the object lots of cool methods
  that it can use to ask questions or do things.

  Being incredibly object-oriented gives Ruby lots of power
  and makes your life easier.



COMMENTS
# Comments in Ruby
=begin
for multi line comments
NOTE "=begin" and "=end" cannot be tabbed in from the left border
NOTE  THERE CANNOT BE ANY SPACES AFTER "=begin" or "=end"!!!
=end





PUTS VS PRINT - NEW LINES AFTER DECLERATIONS:

Ruby automatically adds a blank line (or newline) after some declerations;
.chomp is a method that removes that extra line.
(Your program will work fine without chomp, but youll get extra blank lines everywhere.)

puts will automatically add a new line after ever statement
print will not


  # playing with new lines (\n) and .chomp
  print "What's your name?\n"
  first_name = gets
  puts first_name.chomp
  puts first_name




ESCAPING CHARACTERS WITH "\"

puts "This string has a quote: \".  As you can see, it is escaped (the quote is still there after printing)"
# => This string has a quote: \".  As you can see, it is escaped (the quote is still there after printing)

SPECIAL ESCAPED CHARACTERS
NOTE ONLY for double quoted "" strings!!!

\n  for newline
\t  for tabs
\s  for space

there are many others
Any other character is interpreted as the character itself

puts "this is \n on a new line"
# => This is
#    on a new line

# does not work with single '' quotes
puts 'this is \n on a new line'
# => This is \n on a new line


SPECIAL NOTE: Single quoted strings '..'
will automatically place a "\" in front of special characters like #{...}!


    String Interpolarion (like template literals, see further below),
    puts "The number #{1 + 1}"
    # => The number 2

    puts "The number \#{1 + 1}"
    # => The number #{1 + 1}

    puts 'The number #{1 + 1}'   # single quotes will place \ in front of special characters!
    # => "The number \#{1 + 1}"




VARIABLES :

Variables in Ruby must start with a letter or an "_".
Cannot use special characters "@", "#", "'" or spaces.

 x = 10
 Test7 = 7
 7Test = 7  (!INVALID)


OPERATORS :

x = x + y
x += y

x = x + 1
x += 1

NOTE  there is no x++ !!!


<<    to append things to a string (or array?)
"howdy" << "fella!"
#=> "howdy fella!"


=  is fo assignment
== is comparator
=== to check type / instance of a class :

    puts Integer === 3   # NOTE the type / class MUST be on the left side
    # => true

    x = 3
    puts Integer === x
    # => true

    x = 3
    puts x === Integer
    # => Error

=== also to check if the right is a member of the thing on the left

    puts (1..4) === 3
    # => true
    puts (1..4) === 8
    # => false



DEFINING MULTIPLE VARIABLES AT ONCE / "Parallel Assignment" :

    a, b = 1, "hi"


    my_array = [1,2,3,4]
    my_array[1], my_array[3] = "many", "at once!"
    my_array
    #=> [1, "many", 3, "at once!"]



SWAP TWO VARIABLES AT ONCE :

    a = 10
    b = 25

    a,b = b,a

    a   #=> 25
    b   #=> 10




STRING METHODS:

.to_s tries to convert whatever into a string.


.length
.upcase
.downcase
.capitalize
.swapcase
.reverse
.chop


name = "Paul"
name.downcase
name.reverse
name.upcase
puts name
# =>  Paul  (nothing has been re-assigned)

name = "Paul"
name = name.downcase
name = name.reverse
name = name.upcase
puts name
# =>  LUAP

name = "Paul"
name.downcase!
name.reverse!
name.upcase!
puts name
# => LUAP

name = "Paul"
# name.downcase.reverse.upcase!
# Must put the "!" after each one!
name.downcase!.reverse!.upcase!
puts name
# => LUAP

# If I want to see the outcome without re-assigning / chaning the original variable:

name = "Paul"
puts name.downcase.reverse.upcase
# => LUAP
puts name
# => Paul


# playing with word case methods:
puts first_name = "paul is my first name".capitalize!
# => Paul is my first name

#puts first_name = "paul is my first name".titleize!
# .titleize only works for Ruby on Rails, not base Ruby

puts last_name = "RAIL".capitalize!
# => Rail
puts city = "TorONTo".capitalize!
# => Toronto
puts state = "Ontario".upcase!
# => ONTARIO



string[0]  gets the first letter
string[2]  gets the second letter
string[-1]  gets the last letter
string[-2]  gets the second-last letter

[n..m]  to grab a specific part of a string
  myString = hello
  myString[2..4]
  #=> "llo"
  myString[1..-2]
  #=> "ell"


.split("")   : same as javascript
.split(/regexp/)   : split based on regexp




COMBINING STRINGS :

puts "Test1" + "Test2"
# => Test1Test2


x = "Combined"
y = "String"
puts "Success!" if x + y == "CombinedString"
# => Success!

Shovel operator another option but might be best not to?

MULTIPLY STRINGS :

puts "abc" * 5
# => abcabcabcabcabc


COMPARING STRINGS :

puts "x" > "y"
# => false

puts "y" > "x"
# => true

This is Ruby comparing the numbers in ASCII value that represent the characters, x and y.
You can check what ASCII value represents what chartacters:

puts 120.chr
# => x




IMPORTANT - LOOPING THROUGH EACH LETTER IN A STRING with ".each_char" :

my_string.each_char do |letter|
  ....
end




For MULTI-LINE STRINGS :

  x = "This is a single line string"

  y = %q{This is
  a multi-line
  string}

  puts y
  # => This is
  #    a multi-line
  #    string

In the example above the "" marks are replaced by %q{...}
But the "{}" can also be "<>" or "!!" or "@@"

  z = %q!This is
  a multi-line
  string!
  puts z

SPECIAL NOTE:  If your use "!!" as delimiters, then any other "!" in your sring will mess it up.


Can also use a multi character delimeter called a "here document":
(this concept is found in many other languages)

x = <<END_MY_STRING_PLEASE
This is a string
and a second line
END_MY_STRING_PLEASE

puts x
# => This is a string
#    and a second line

The "<<" at the start is required.
This method helps reduce conflicts like "!" in the "!!" example




STRING JUSTIFY METHODS :

string.ljust(num,"char") :  places string on left and adds padding after
string.rjust(num,"char") :  places string on right and adds padding before
string.center(num,"char") : places string in center and adds padding before & after

  "hi".ljust(6) #=> "hi      "
  "hi".ljust(4,"*") #=> "hi****"

  "hi".rjust(4,"*") #=> "****hi"

  "hi".center(6,"!") #= "!!hi!!"





STRINGS AND NUMBERS COMBINED:

  # Can't combine number and strings like so:
  print "2+2 = " + 2 + 2
  # =>  Error

  # do this with a "," instead:
  print "2+2 = ", 2 + 2
  # => 2+2 = 4


OR  STRING INTERPOLATION "#"{VARIABLE_NAME}  :
# Ruby "string interpolation" is similar to "template literals" in ES6 using #{variable_name} placed into a string:


  print "2+2 = #{2 + 2}"
  # => 2+2 = 4

#SPECIAL NOTE This only works in double quoted ""  strings!
  print '2+2 = #{2 + 2}'
  # => 2+2 = #{2 + 2}   #does not work with ''



  first_name = "Kevin"
  puts "Your name is #{first_name}!"
  # => Your name is Kevin!

  # NOTE single quotes will not work with string interpolation
  puts 'Your name is #{first_name}!'
  # => Your name is #{first_name}!


  puts "It's a #{"mad " * 3}world"
  # => It's a mad mad mad world

  my_string = "It's a #{"mad " * 3}world"
  puts my_string
  # => It's a mad mad mad world



INTEGERS  VS  FLOATS:

    10 / 3
    => 3   #(error because it assumes only whole numbers are desired!)

    10.0 / 3
    => 10.333333


    x = 10
    y = 3
    puts x / y
    # => 3

USE ".to_f" to convert to floats :

    x = 10
    y = 3
    puts x.to_f / y.to_f
    # => 3.3333

".to_f" is a built-in method of the "integer" class.

".to_i" converts to an integer (always rounded down!) :

    puts 5.7.to_i
    # => 5




RANGES  -  IMPORTANT BENEFIT OF RUBY!!!  :

      Range.new(start, finish)

      puts Range.new(3, 11)
      # => 3..11

      puts (3..11)
      # => 3..11   ???

      puts (3..11).each { |n| puts n }
      # => 3
      # 4
      # 5
      # 6
      # 7
      # 8
      # 9
      # 10
      # 11

      puts (3..11).each { |n| print n }
      # => 34567891011

      puts (3..11).each { |n| print n, " " }
      # => 3 4 5 6 7 8 9 10 11

      puts (3..11).each { |n| print "#{n} " }  # also works (see further below)
      # => 3 4 5 6 7 8 9 10 11

      puts Range.new(3, 11).each { |n| print n, " " }
      # => 3 4 5 6 7 8 9 10 11


      (3..11)  will include 11
      (3...11)  will exclude 11

      puts (3...11).each { |n| print n, " " }
      # => 3 4 5 6 7 8 9 10


RANGES ALSO WORKS WITH LETTERS :

    example:  ('a'..'z')

    ('a'..'z').each { |letter| print letter }
    #=> abcdefghi....xyz


    ('a'..'z').include?('r')
    #=> true
    ('a'..'z').include?('R')
    #=> false


RANGES TO GRAB A PORTION OF AN ARRAY OR STRING :

    array = [2,4,6,8,10,12,14]
    print array[1..3]
    #=> [4,6,8]

    string = "this is a string"
    print string[2..12]
    #=> "is is a str"




CONSTANTS (variables that start with a captial letter :

These are called constants and start with a capital letter.

Variable = 33
Variable = 30
# => Error! "warning: already initialized constant Variable"

You are allowed to modify them anyways (at least according to the book)
But they may change this in future versions of Ruby.



CONVERT BETWEEN TYPES:  to_f  to_i  to_s  to_a


OBJECTS / CLASSES:


Class: Definition of a concept in an OOP language like Ruby.
Object: Is a single instance of a particular class.
        An object of the class Dog is a single dog.

Can think of "class" as a category,
and object is a specific thing that fits into categories.

Classes start with a capital letter, just like constants do, because they are a constant.


Example of defining a concept of a "person" object:

    class Person
      attr_accessor :name, :age, :gender
    end

class names in Ruby start with a Capital first letter.
"attr" = attribute
"accessor" = "make these attributes accessible to be set and changed at will"
"end" = required at the end of any class decleration in Ruby


CREATING NEW INSTANCE OF A CLASS:

    person_instance = Person.new
    #=> #<Person:0x0055900739b808>

DEFINING THE ATTRIBUTES OF AN INSTANCE OF A CLASS:

    person_instance.name = "Robert"
    person_instance.age = 52
    person_instance.gender = "male"

    class Cat
       attr_accessor :name, :age, :gender, :color
    end

    class Dog
       attr_accessor :name, :age, :gender, :color
    end

    pixel = Cat.new
    waffles = Dog.new

    pixel.color = "tortoishell"
    waffle.age = 2


INHERITANCE :
Inheritance provides a simpler way to pass all these attributes to each pet.

Create a parent class Pet.
Then let Cat and Dog inherit the features of all pets.

    class Pet
       attr_accessor :name, :age, :gender, :color
    end

    class Cat < Pet
    end

    class Dog < Pet
    end

For attributes that are not applicable to every animal:

    class Snake < Pet
      attr_accessor :length
    end

sammy = Snake.new
sammy.name = "Sammy"
sammy.length = 500
lassie = Dog.new
lassie.name = "Lassie"
lassie.age = 12
lassie.length = 700   # =>  ERROR  undefined method "length" for #<Dog>


METHODS AND OBJECTS
Methods to give your objects actions and do things.

SPECIAL NOTE: Every method returns something, even if its just nil.
this is why when you write "puts 'hi'" in IRB, you still see "=> nil".
Printing out the "hi" is just a side effect of your code,
then it still returns "nil" when done.

my_var = 12
puts my_var
#=> 12
#=> nil

VS just:

my_var
#=> 12



To define a method, you use the word "def" followed by the name of method you wish to define.
You finish a method with "end"

    class Dog < Pet
      def bark
        puts "Woof!"
      end
    end

The last (2nd) "end" above finishes the class''s definition.

    a_dog = Dog.new
    a_dog.bark
    # => Woof!



BANG METHODS - finished with a "!" :
(these are dangerous/distructive)

Ex ####.sort!
They actually modify the original object.
Unlike a normal method which outputs whatever the method returns,
it will preserve the original object.

Bang methods save over the original object, the are "destructive".

my_numbers = [1,5,3,2]
my_numbers.sort
#=> [1,2,3,5]
my_numbers
#=> [1,5,3,2]  (still the same!)

my_numbers.sort!
#=> [1,2,3,5]
my_numbers
#=> [1,2,3,5]  (it has been permanently modified)



METHODS ENDING WITH "?"  RETURN "true/false"



ALMOST EVERYTHING IN RUBY IS AN "OBJECT"
AND ALL OBJECTS HAVE METHODS :

  with puts 1 + 10
  # => 11

  1 and 10 are actually  both objects.
  #They are objects of the class "Fixnum".
  UPDATE!!!  As of Ruby 2.4  "Fixnum" and "Bignum" classes are gone!
  There is only "Integer" now.

  And the "+" is actually a method!
  Like a_dog.bark above, "a_dog" is a object that calls the method we defined as "bark"

  So 2.+2   or   2.+(2)  will also  print "4"
  because "2" is an object of class "Integer", And "+" is a method in the Fixnum class.



YOU CAN CHECK WHAT AN OBJECTS METHODS ARE BY USING ".method" METHOD :
And ".instance_methods" will return an even longer list,
as it returns all methods available to any instance of that class.

    puts 6.methods
    # => long list of possible methods



You can check which class each object is based from with ".class" method.
.class is a method that is pre-built into Ruby.

    puts a_dog.class
    # => Dog

    puts 2.class
    # => Integer

You can check to see what the parent class above a class is with ".superclass" :
(Note, must be ".class" before, as in ".class.superclass")

    2.class.superclass
    #=> Numeric

Eventually everything is a child of "BasicObject".




YOU CAN CHECK IF AN OBJECT IS A TYPE OF CLASS WITH ".is_a?" METHOD :
(This is also called a "Reflection Method", where an object reflects on its nature)

  puts 1.is_a?Integer
  # => true
  puts 1.is_a?Float
  # => false
  puts 1.5.is_a?Float
  # => true
  puts 1.is_a?String
  # => false
  puts "1".is_a?String
  # => true

You can apparently add any method we want to the "Integer" class
and process numbers any way we see fit? (???)



"object_id" can be used to debug,
such as when an object you re trying to modify but its not changing,
it could be that you were only modifying a COPY of that object.




TEST IF SOMETHING IS "nil" with method ".nil?" :

    my_arr = []
    my_arr[0].nil?
    #=> true

    my_arr = [1,2,3]
    my_arr[0].nil?
    #=> false

If you try to run a method on something that is "nil" you will get this error:
"NoMethodError: undefined method `empty? for nil"



TEST IF SOMETHING IS EMPTY with ".empty?" :

    x = []
    puts "x is empty" if x.empty?
    #=> x is empty



CHECK IF AN OBJECT WILL RESPOND TO A CERTAIN METHOD with ".respond_to?(:method)":

    .respond_to? takes a symbol and returns true if an object can receive that method and false otherwise. For example,

    [1, 2, 3].respond_to?(:push)
    would return true, since you can call .push on an array object. However,

    [1, 2, 3].respond_to?(:to_sym)
    would return false, since you cant turn an array into a symbol.





KERNEL METHODS

"Kernel" is a special class (actually a module, which is explained later),
that is part of Ruby''s core.
whose methods are made available in every class and scope throughout Ruby.
It is filled with most commonly used methods to make coding easier.

"puts" is actually a method from the "Kernel" module.

You dont need to write something like 'Screen.puts "Hello world!"'

When you type "puts 'Hello World!'", and there is no class or object involved,
Ruby looks through its default built-in classes and methods that are in the "Kernel" module.

What is really happening is that "puts" is a method of "Kernel".
So this does the same thing :

    Kernel.puts "Hello world!"
    # => Hello world!



PASSING DATA TO METHODS

With puts "Hello world!"
The data passed to "puts" is the string "Hello world!".

So you can place the data you want to pass after the method with a space.
The usual practice is to pass the data to the method by surrounding it with "()" parentheses brackets.

These all produce the same output :
    puts "Hello world!"
    puts("Hello world!")
    Kernel.puts "Hello world!"
    Kernel.puts("Hello world!")
    # =>  Hello world!

But this is only a shortcut, and becomes an issue when you want to tie a number of methods together.
"()" are required when you want/need to pass more than one argument.
There are other times when they are simply required as well.



RUBY WITHOUT OBJECTS / WRITTING YOUR OWN METHODS
ie "FUNCTIONS" THAT ARE STANDALONE :


  def methodname(argument1, argument2)
    ...code...
  end

Your method will spit out whatever follows the return statement (if you add that),
or whatever the last piece of code at the end of it.

Example of a stand alone method :
    def dog_barking
      puts "Woof!"
    end

    dog_barking
    # => "Woof!"

This seems to act just like a function in JavaScript.
It is a general method that is defined without being tied to a class or object.
You can call this method simply by putting its name by itself.

"dog_barking" actually gets placed under a special internal class "Object",
like "puts" is part of "Kernel".

    Object.dog_barking
    # => Woof!


If you want to supply a "default input/argument", that is
if there are cases that where you call a method
without suppling it with any arguments from where it is being called,
but you still want that method to always have at least 1 argument:

    def speak(words="shhhhh")
      return words
    end

    speak         # method called without any arguments provided
    # => shhhhh

    speak("Hello!")   # method called with 1 argument provided
    # => Hello!

    speak("Hello!","Goodbye")   # method called with too many arguments provided
    # => ERROR

    def speakTwo(first="shhhh", second=" Be Quiet!")
      return first + second
    end

    speakTwo         # method called without any arguments provided
    # => shhhh Be Quiet!

    speakTwo("Honey")    # method called with less arguments then expected
    # => Honey Be Quiet!

    speakTwo("Honey"," I'm home!")
    # => Honey I'm home!


If there are no default arguments to a method:

    def speak3(word1, word2, word3)
      return word1 + word2 + word3
    end

    speak3("Hello")    # method called with less arguments then expected
    # => ERROR: wrong number of arguments given





IF STATEMENTS :

Typical if statement:

    if condition
      # Do something!
    end

Single-line if statement:

format:
    code/expression if test

# NOTE :  CANNOT reverse that format.
# works:
    puts "It's true!" if true
# does NOT work:
    if true puts "It's true"


    age = 10
    puts "You're too young for this ride." if age < 14
    # => You're too young for this ride.

    age = 18
    puts "You're too young for this ride." if age < 14
    # => [blank]

    puts "You're a teenager" if age > 12 && age < 20
    # => You're a teenager

    puts "You're either very young or very old" if age < 10 || age > 80






UNLESS COMPARATOR :

    age = 24
    puts "You're NOT a teenager." unless age > 12 && age < 20
    # => You're NOT a teenager.


BETWEEN? :

    age = 24
    puts "You're NOT a teenager." unless age.between?(13, 19)

IMPORTANT NOTE: The "?" is required in "between?"


TERNARY OPERATOR " x ? y : z " :

format:
    action test ? result1 : result2(else)


    puts 3 < 4 ? "3 is less than 4!" : "3 is not less than 4."

    #OR

    3 < 4 ? puts("3 is less than 4!") : puts("3 is not less than 4.")
    # NOTE the () are necessary in this case!


COMPARATOR  <=>  (spaceship operator) :

x <=> y  :   returns 0 if x == y,  1  if x > y,  -1  if  x < y




CONDITIONAL ASSIGNMENT operator "||:" :

When you only want to assign a value to a variable IF it does not already have a value
(if variable != nil)


    favorite_book = nil
    puts favorite_book

    favorite_book ||= "Cat's Cradle"
    puts favorite_book

    favorite_book ||= "Why's (Poignant) Guide to Ruby"
    puts favorite_book

    favorite_book = "Why's (Poignant) Guide to Ruby"
    puts favorite_book

    #=> Cat's Cradle
    #   Cat's Cradle
    #   Why's (Poignant) Guide to Ruby




LOOPS ".times" :

    5.times do print "Test" end
    # => TestTestTestTestTest

    5.times { print "Test" }
    # => TestTestTestTestTest

    "{}" are usually used for single line expressions for ease of reading.
    "do" and "end" are better for multiple lines of code.
    Its the style that most Ruby developpers follow. (but not required?)

    x = 0
    7.times { x += 3 }
    print x
    # => 21


ITERATOR LOOPS :

    1.upto(5) { ...code to loop here... }
    # counts from 1 up to 5

    10.downto(5) { ...code to loop here... }
    # counts from 10 down to 5

    0.step(50, 5) { ...code to loop here... }
    # counts up from 0 to 50, in steps of 5



    To access the current iterated number :

    1.upto(5) { |number| print number }
    # => 12345

    1.upto(5) { |whatever| print whatever }
    # => 12345

    1.upto(5) do |whatever|
      print whatever
    end
    # => 12345





# IMPORTANT NOTE ON CODE BLOCKS  (might move this down)
# Only one code block can be passed at any one time.
# Its not possible to accept two or more code blocks as parameters to a method.
# However, code blocks may accept none, one, or more parameters themselves.





MANIPULATING STRINGS / REGEXP

Substitutions .sub() / .gsub() :

.sub() only does 1 instance (the first matching instance it encounters)
.gsub() does all matching instances

puts "foobar".sub('bar', 'foo')
# => foofoo

puts "this is a test".gsub('i', '')
# => ths s a test


If you want to replace the first 2 characters in a string with "Hello":

puts "This is a test".sub(/^../, 'Hello')
# => Hellois is a test

The last 2 letter...:

puts "This is a test".sub(/..$/, 'Hello')
# => This is a teHello



DATE & TIME :

The "Time" class is used for this.

puts Time.new
# => 2018-03-07 11:09:15 -0500

puts "Current Time : " + Time.new.inspect
# => Current Time : 2018-03-07 11:09:15 -0500

NOTE for some reason the ".inspect" is required (when interacting with strings?)

puts Time.new.year
# => 2018
puts Time.new.month
# => 3
puts Time.new.day
# => 7
puts Time.new.wday   # day of the week, 0 is Sunday
# => 3
puts Time.new.yday   # day of the year of 365
# => 66
puts Time.new.wday   # day of the week, 0 is Sunday
# => 3
puts Time.new.hour   # 24 hour format
# => 11
puts Time.new.usec   # microseconds
# 257399
puts Time.new.zone
# => Eastern Standard Time


TIME ARITHMETIC / MODIFYING TIME :

now = Time.now  # this time will be locked in
puts now
# => current time

past = now - 10
puts past
# => 10 seconds ago

future = now + 10
puts future
# => 10 seconds from now

difference = future - now
puts difference
# => 10  (10 seconds between those two times)




GRABBING / PROMPTING USER INPUT -  ".gets" :

      player1 = gets
      Paul  #<- USER-INPUT-GOES-HERE
      # => "Paul\n"

NOTE  the "\n" comes from the user pressing "Enter"

To remove the "...\n"  use ".chomp" .
".chomp" removed the space or "\n" at the end of a string.
It also takes an extra optional argument to speficy what gets chomped off.
".strip" removes the ALL spaces and "\n" at beginning and end of a string.


      player1 = gets.chomp
      Paul  #<- USER-INPUT-GOES-HERE
      # => "Paul"


SYMBOLS with  ":my_symbol" :

Used mostly with hash keys.

Symbols are like strings except immutable ( while strings are mutable / can be modified).
Symbols are also only stored in one place in memory,
strings location in memory change each time they are called.


Why use Symbols instead of just a constant (variable that starts with capital letter)?
"Since symbols don't have some of the capabilities [built-in methods] of strings,
they are more efficient to store in memory. It is appropriate to use symbols
when the additional functionality that strings provide is not required."


NOTE:  if you puts or print a symbol, it will be posted as a string.

my_string = "words"
my_string[0..1] = "bi"
print my_string #=>  birds

my_string = :words
my_string[0..1] = "bi"  #=> ERROR  can't do this with symbol

my_string = :birds  # this would work






ARRAYS  :

Creating arrays:   a = []   or   b = Array.new


(VERY USEFUL!)
CREATE AN ARRAY FROM A RANGE with "to_a" :

  array_from_range = (1..6).to_a
  #=> [1,2,3,4,5,6]




  Fill an empty array:
  empty_array = Array.new(5)
  #=> [nil, nil, nil, nil, nil]

  Fill an array with a repeating string:
  full_array = Array.new(5, "hi")
  #=> ["hi", "hi", "hi", "hi", "hi"]

  EMPTY AN ARRAY WITH ".clear" ( or just set = [] ):
  full_array.clear
  full_array
  #=> []

Convert a string to an array with "%w{}":
c = %w{ I am not a crook }            # NOTE there are no quote marks "" or ''
#=> ["I", "am", "not", "a", "crook"]

    # NOTE cannot place a variable inside %w{ }


arr = [1,2,3,4,5]

arr[0] #=> 1
arr[-1] #=> 5

arr[1..3]       #=> [2,3,4]
arr.slice(1..3) #=> [2,3,4]  # same things ar [1..3]!

arr[1..9000] #=> [2,3,4,5]  # no errors


MODIFYING ARRAYS :

  arr[0] = 42
  arr #=> [42,2,3,4,5]

  Replace multiple array values with 1 value:   (CAREFUL WITH THIS!!!)
  arr[2..4]
  arr
  #=> 42,2,42


ADDING ARRAY TOGETHER :

  arr1 = [1,2,300]
  arr2 = [7,8,9]

  combined = arr1 + arr2
  combined
  #=> [1,2,300,7,8,9]


ADD TO and REMOVE ITEMS FROM -END- OF ARRAYS with ".push / <<"  & ".pop" :

  my_arr = [1,2,3]

  my_arr.push(747)
  my_arr
  # => [1,2,3,747]

# with Shovel operator "<<"
  my_arr << 9000
  my_arr  #=> [1,2,3,746,9000]

#SPECIAL NOTE: "<<" shovel operator is often overwritten in things like Rails


  my_arr.pop
  my_arr #=> [1,2,3,747]
  my_arr.pop
  my_arr #=> [1,2,3]
  my_arr.pop
  my_arr #=> [1,2]


REMOVE ITEMS FROM / ADD TO   -START- OF ARRAYS with ".shift" & ".unshift(newValue)" :

  my_arr = [4,5,6]

  my_arr.shift
  my_arr  #=> [5,6]

  my_arr.unshift(999)   # requires a (newValue) or nothing happens
  my_arr #=> [999,5,6]


DELETE ITEM FROM SPECIFIC INDEX IN ARRAY with ".delete_at()" :

  my_arr = [1,2,3]
  my_arr.delete_at(1)
  my_arr
  #=> [1,3]



FIND IF ITEM EXISTS IN ARRAY with ".include?()" :

  my_arr = [1,2,3,4]
  my_arr.include?(3)  #=> true
  my_arr.include?(72)  #=> false


FIND INDEX OF AN ITEM IN ARRAY with ".index()" :
#NOTE this only finds first match

  my_arr = [5,6,7,8]
  my_arr.index(6)  #=> 1
  my_arr.index(2)  #=> nil

  my_arr = [5,6,7,8,6,6,6,6,6]
  my_arr.index(6) #=> 1     #just the first one is indicated



SUBTRACTING ARRAYS / REMOVING DUPLICATES :
  [1,2,3] - [2,3,6]
  #=> [1]              # the 6 did nothing as it was not a duplicate / not present in the first array

  [2,2,2,5,7,1,2,2,3] - [2]
  #=> [5,7,1,3]


FIND DUPLICATES / MATCHING VALUES IN 2 ARRAYS  with "union" "&":
  [1,2,3]&[3,4,5]
  #=> 3

  [1,2,3]&[3,4,5]&[7,3,0]
  #=> 3

  [1,2,3]&[3,4,5]&[7,0]   # when there is a match in only 2 of the 3
  #=> []



CONVERT AN ARRAY INTO A STRING with ".join()" :

  ["he", "llo"].join
  #=> "hello"

  phrase_array = ["a", "broken", "phrase"]
  "This was #{phrase_array.join(' ')}"
  #=> "This was a broken phrase"

  bugs = ["butterfly", "beetle", "ladybug"]
  "By the pond I found a #{bugs.join(' and a ')}."
  #=> "By the pond I found a butterfly and a beetle and a ladybug."





THE INSPECT METHOD - for debugging :

  puts "Short sentence. Another. No more.".split(/\./).inspect
  #=> ["Short sentence", " Another", " No more"]

  puts "Short sentence. Another. No more.".split(/\./)
  #=> Short sentence
  #   Another
  #   No more

 The inspect method is common to almost all built-in classes in Ruby and it gives you a textual
representation of the object. For example, the preceding output shows the result array in the same way that
you might create an array yourself. inspect is incredibly useful when experimenting and debugging!
split is also happy splitting on newlines, or multiple characters at once, to get a cleaner result:

  puts "Words with lots of spaces".split(/\s+/).inspect
  #=> ["Words", "with", "lots", "of", "spaces"]

  puts "Words with lots of spaces".split(/\s+/)
  #=> Words
  # with
  # lots
  # of
  # spaces



ENUMERABLE ITERATORS :  (SEE SEPERATE FILE "Enumarable Iterators - All" in Interview Questions folder FOR MORE COMPLETE VERSION OF THIS )
".each" / ".each_with_index",
".select"
".map" / ".collect"
.
.
ENUMERABLES are types of data, like arrays and hashes, that can be iterated upon to go through each value stored inside.


FILTERING ARRAYS with ".select" :
is the same as  .filter from JavaScript.

    my_array = [1,2,3,4,5,6,7,8,1000]

    my_array.select { |item| item%2 == 0 }
    #=> [2,4,6,8,1000]



COLLECT ITERATOR FOR ARRAYS with ".collect {...}" or ".map {...}" :
Similar to .map in JS

The collect method takes a code block  ( {...} ),
and applies the expression in the block to every element in an array.

    fibs = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55]

    doubled_fibs = fibs.collect { |n| n*2 }

    puts doubled_fibs
    # =>[2, 2, 4, 6, 10, 16, 26, 42, 68, 110]



OTHER USEFEUL ARRAY METHODS :

.length  /  .size   :  these do the same obvious thing!

.max :  finds the largest value
.min :

.uniq : removes all duplicates
.sort : sorts items in your array. can allow parameters to specify how to sort
.shuffle :  randomizes all the items in the array
.sample : picks out a random value in the index




ADVANCED ARRAY METHODS

Array.new has an optional argument that can be provided.

CREATE AN ARRAY OF ALL SQUARED NUMBERS using "Array.new(){}" :

  Array.new(5){|item_index| item_index ** 2}
  #=> [0,1,4,9,16]






HASHES  :
Basically Objects from JavaScript :

  Hashes are similar to arrays.  But with Key => value pairs
  Or arrays are basically hashes where the keys are all predetermined to be 0,1,2,3,4...
  But hashes keys will be strings (or symbols)

  And you can search through hashes with strings

Creating a Hash:

   my_hash = {}
   Or
   my_hash = Hash.new


favorite_colors = {"eyes" => "blue", "hair" => "blonde"}

favorite_colors["hair"]   #just like an array
#=> "blonde"

favorite_colors["hair"] = "red"  #just like an array
favorite_colors["hair"]
#=> "red"

favorite_colors
#=> {"eyes" => "blue", "hair" => "red"}


player = {"health" => 100, "speed" => 75, "strength" => 65}
player["health"]
#=> 100

player["health"] -= 11
player["health"]
#=> 89


OPTION HASHES / PARAMETERS PASS TO A METHOD / HASHES IN RAILS :

These are a way to pass options to a method. Often used in Rails.

Methods are often defined like so:

    def method_name arg1, arg2, option_hash
      ...code...
    end

# NOTE if a hash is the last argument passed to a method, you can skip the {}
# this apparently is a source of confusion for new ruby coders

some_object.some_method arg1, arg2, :param1 => value1, :param2 => value2



DELETE FROM A HASH with ".delete()" or set = nil (this set to nil does not work?? ):

favorite_smells = { :flower => "daffodile", :cooking => "bacon" }
favorite_smells
#=> { :flower => "daffodile", :cooking => "bacon" }

favorite_smells.delete(:flower)
favorite_smells
#=> { :cooking => "bacon" }

favorite_smells[:cooking] = nil   # this does not work?!?!
favorite_smells
#=> {}                       # this is not the result?!?




DELETE ONLY CERTAIN ELEMENTS FROM HASH BASED ON CONDITION with ",delete_if {...}" :


    x = { "a" => 100, "b" => 20 }
    x.delete_if { |key, value| value < 25 }
    print x

    #=> {"a"=> 100 }

# IMPORTANT NOTE a code block on a HASH works much clearer if passed |key, value| as arguments.
# The first arg passed, whatver its called, is seens as the key, even if its only arg passed.
# So x.delete_if { |value| value < 25 }  will not work, as it will just refer to the key, even if you call the arg "value".





(VERY USEFUL!!!)
FIND ALL THE KEYS OR ALL THE VALUES OF A HASH :

  favorite_colors.keys
  favorite_colors.values



MERGE TWO HASHES with ".merge()" :

favorite_beers = { :ipa => "innis&gunn", :blonde => "Blanche de Chambly" }

favorite_colors.merge(favorite_beers)
#=> { "eyes" => "blue", "hair" => "blonde", :ipa => "innis&gunn", :blonde => "Blanche de Chambly" }



FIND IF A VALUE EXISTS IN A HASH :  /inlcude?() :

my_hash = {:key1 => "value1", :key2 => "value2" }

my_hash.include?(:key1) #=> True
my_hash.include?(:key3) #=> False
my_hash.include?("value1") #=> False  #for value require looking in all the hash's values?
my_hash.values.include?("value1") #=> True
my_hash.values.include?("value3") #=> False



SIMPLER / FASTER HASH is called a "Set" :
A Set only has values that are True or False.

This is faster for your computer to go through.



Rails has a "link_to" helper function that creates a link to a webpage.
You can also optionally assign it an ID and a class.




CONVERT STRINGS TO SYMBOLS with "to_sym" :
(or, oddly, ".intern")

strings = ["HTML", "CSS", "JavaScript", "Python", "Ruby"]

# Add your code below!

symbols = []

strings.each { |string|
  symbols.push(string.to_sym)
}

print symbols
#=> [:HTML, :CSS, :JavaScript, :Python, :Ruby]


SYMBOLS MODERN SHORTHAND :
:symbol_name =>    VS    symbol_name:
(ONLY IN HASHES!)

# old
:symbol_name => "whatever value"
# new
symbol_name: "whatever value"





>>>>>>>  INTERMEDIATE RUBY CONCEPTS:   <<<<<<<





GIVE YOUR OWN METHOD THE ABILITY TO HANDLE CODE BLOCKS with "yield" :

    def each_vowel
      array = ['a','e','i','o','u']
      array.each { |vowel| yield vowel }
    end

    each_vowel { |vowel| puts vowel }
    #=> aeiou


ALTERNATIVE WAY TO GIVE YOUR METHODS ABILITY TO HANDLE CODE BLOCKS with "def method_name(&block_name)"

This method''s benefit is that it can be more visually clear
that you passing a code block in the def line of the method.


    "&code_block"  needs to be  matched with  "code_block.call"

    def each_vowel(&code_block)
      array = ['a','e','i','o','u']
      array.each { |vowel| code_block.call(vowel) }
    end

    each_vowel { |vowel| puts vowel }

    #=> aeiou


# SPECIAL NOTE:  Only one code block can be passed at any one time.
# It's not possible to accept two or more code blocks as parameters to a method.
# However, code blocks may accept, none, one, or more parameters themselves.

YIELD CAN ALSO PASS PARAMETERS TO YOUR BLOCK :

confusing example at  http://www.eriktrautman.com/posts/ruby-explained-blocks-procs-and-lambdas-aka-closures



STORING CODE BLOCKS AS VARIABLE with "lambda" or "proc" :

First simple example:

    my_codeblock_as_variable = lambda { |x| puts x }

    my_codeblock_as_variable.call(100)
    #=> 100


PROCS (saved blocks) with Proc.new + "&" :

blocks of code are one of the only non-object things in Ruby.
But sometimes you want to re-use the same block and not write it / repeat it several times.

You can save a block into a "proc".
Procs are full-fledged objects, so they have all the powers and abilities of objects. (Blocks do not.)

format:

    proc_name = Proc.new { |n| ... code block you want saved ... }
    #OR
    proc_name = Proc.new do |n|
      ...
      code block you want saved
      ...
    end

    then call it as so:
    action array.method(&proc_name)



Example:

    multiples_of_3 = Proc.new do |n|
      n % 3 == 0
    end

    print (1..100).to_a.select(&multiples_of_3)
    #=> [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48, 51, 54, 57, 60, 63, 66, 69, 72, 75, 78, 81, 84, 87, 90, 93, 96, 99]



# NOTE does not need to be an array, but is most likely place to consider using a proc




PASSING AN ARGUMENT TO A PROC:


my_proc.call(argument)
my_proc.call("howdy")
howdy => nil





COMBINING PROCS AND SYMBOLS with "(&:mehod)" :
(to convert many things in an array)

    strings = ["1", "2", "3"]
    nums = strings.map(&:to_i)
    # ==> [1, 2, 3]


    numbers_array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    strings_array = numbers_array.map(&:to_s)
    #=> ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]




LAMBDAS  (almost the exact same as PROCS) :


There are only two main differences between Lambdas and Procs:

1. A lambda checks the number of arguments passed to it, while a proc does not.
So a lambda will throw an error if you pass it the wrong number of arguments,
whereas a proc will ignore unexpected arguments and assign nil to any that are missing.

2. When a lambda returns, it passes control back to the calling method;
when a proc returns, it does so immediately, without going back to the calling method.



Typing

    lambda { puts "Hello!" }

Is just about the same as

    Proc.new { puts "Hello!" }

Example:

    def lambda_demo(a_lambda)
      puts "I'm the method!"
      a_lambda.call
    end

    lambda_demo(lambda { puts "I'm the lambda!" })

    #=> I'm the method!
    #   I'm the lambda!


Another example:
Given an array of strings and symbols,
write a lambda that checks to see if each element in an array is a symbol,
then store only the symbols into a varialbe and print those out.

    my_array = ["raindrops", :kettles, "whiskers", :mittens, :packages]

    # Add your code below!
    symbol_filter = lambda { |param| param.is_a?(Symbol) }

    symbols = my_array.select(&symbol_filter)

    puts symbols

    #=> [:kettles, :mittens, :packages]


To better show the differences between Proc and Lambda:

    def batman_ironman_proc
      victor = Proc.new { return "Batman will win!" }
      victor.call
      "Iron Man will win!"
    end

    puts batman_ironman_proc


    def batman_ironman_lambda
      victor = lambda { return "Batman will win!" }
      victor.call
      "Iron Man will win!"
    end

    puts batman_ironman_lambda

    #=>
    # Batman will win!
    # Iron Man will win!

-So a return in a block in Proc will completely exit the function with that return provided.
-A return in a Lambda is special be cause it DOES NOT exit the function,
and if there is anything called after the Lambda (implicit return),
the lambda''s return will get overwritten/forgotten.

So you will want to do something with your Lambda''s return immediately




REVIEW "blocks", "procs" & "lambdas" :

-A block is just a bit of code between do..end or {}.
  It''s not an object on its own, but it can be passed to methods like .each or .select.

-A proc is a saved block we can use over and over.

-A lambda is just like a proc, only it cares about the number of arguments it gets
and it returns to its calling method rather than returning immediately.




From http://www.eriktrautman.com/posts/ruby-explained-blocks-procs-and-lambdas-aka-closures :

    -Blocks are unnamed little code chunks you can drop into other methods. Used all the time.

    -Procs are identical to blocks but you can store them in variables, which lets you pass them into functions as explicit arguments and save them for later. Used explicitly sometimes.

    -Lambdas are really full methods that just havent been named. Used rarely.
             have more flexibility like if you want to treturn multiple values at once (because you can safely use the return statement inside of it).
             They are stricter on passing the currect the number of arguments to them.

    -Methods are a way of taking actual named methods and passing them around as arguments to or returns from other methods in your code. Used rarely.

    -Closure is just the umbrella term for all four of those things, which all somehow involve passing around chunks of code.

CLOSURES DEFINITION:

A closure is a computer science way of saying :
A chunk of code that you can pass around but which hangs onto the variables that you gave it when you first called it.




THE ENUMERABLE MODULE :
Its a bunch of methods packaged together, that get included into other classes (such as Array and Hash).
Enumerable contains methods like .map  .each  .select.
It involved doing something to every item in a collection.
Like going through each item in an array or each key in a hash.







SCOPES OF VARIABLES :
(see dedicated file just for this for better understanding)

some variables start with $, @, or @@?
This helps mark them as global, instance, and class variables (respectively).

NO SYMBOL : basic variable called a "local variable"

Variables that are available everywhere (global variables),
Variable that are only available inside certain methods (local variables),
And variable that are members of a certain class (class variables), and variables that are only available to particular instances of a class (instance variables).




OTHER COOL THINGS :


Can use underscore in big numbers :
  1000000 can be written directly as 1_000_000 (one million).
  Ruby allows this, and it makes it easier to read big numbers!


The   " ; "   to make code more compactL
  Ruby supports ending lines of code with semicolons ( ; ) and allows you to put multiple lines of code
  onto a single line (for example, x = 10; x += 1 ; putsx ). In this case, it’s been done to save on lines of code in
  the example, although it’s not considered good style in production-quality Ruby code.
