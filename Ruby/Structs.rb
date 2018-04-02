Probably not used often,

seems to be just a quicker way to define the arguments passed to the def initialize function of a class
(page 139 of Beginer Ruby 3rd Edition)


    Person = Struct.new(:name, :gender, :age)
    fred = Person.new("Fred", "male", 50)
    chris = Person.new("Chris", "male", 25)
    puts fred.age + chris.age
    #=> 75


The first line is equivalent to this longhand method:


    class Person

     attr_accessor :name, :gender, :age

     def initialize(name, gender, age)
       @name = name
       @gender = gender
       @age = age
     end

    end


This code creates a Person class the “long way.” If all you want to do is store some data, then the struct
technique is quicker to type and easier to read, although if you ultimately want to add more functionality
to the class, creating a class the long way is worth the effort. However, the good thing is that you can start
out with a struct and recode it into a full class when you’re ready.
