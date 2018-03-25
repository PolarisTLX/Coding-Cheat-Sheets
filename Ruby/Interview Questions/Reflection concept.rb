Reflection
is the process by which a computer program can inspect, analyze, and modify itself while it’s
running and being used. Ruby takes reflection to an extreme and allows you to change the functionality of
great swathes of the language itself while running your own code.

Example use:
You can use this to print off all the instance variables,
it returns any object variables associated with an instance.

    class Person
     attr_accessor :name, :age
    end

    p = Person.new
    p.name = "Fred"
    p.age = 20
    puts p.instance_variables

    #=> @age
    #   @name




NOTE:
This book doesn’t go deeply into the arts of metaprogramming and advanced reflective techniques, as although they’re
interesting topics, they aren’t widely used until you reach a significant level of competence, and are therefore
beyond the scope of a beginner’s book.
