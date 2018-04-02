In Chapter 6 you worked with a special type of data structure called Struct. Struc t allowed you to create small data-handling classes on the fly, like so:

    Person = Struct.new(:name, :age)
    me = Person.new("Fred Bloggs", 25)
    me.age += 1


Struct gives you the luxury of being able to create simple classes without having to define a class in the long-handed way.

The OpenStruct class provided by the ostruct library makes it even easier. It allows you to create data
objects without specifying the attributes, and allows you to create attributes on the fly:

    require 'ostruct'
    person = OpenStruct.new
    person.name = "Fred Bloggs"
    person.age = 25


"person" is a variable pointing to an object of class OpenStruct , and OpenStruct allows you to call attributes whatever you like, on the fly. It’s similar to how a hash works, but using the object notation.

As the name implies, OpenStruct is more flexible than Struct , but this comes at the cost of harder-to-read code. There’s no way to determine exactly, at a glance, which attributes have been used.

However, with traditional struct s, you can see the attribute names at the same place the struct is created.
