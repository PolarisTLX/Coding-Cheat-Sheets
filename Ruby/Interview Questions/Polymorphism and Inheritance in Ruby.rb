Polymorphism is the concept of writing code that can work with objects of multiple types and classes at
once.

Ruby basic example: the + method works for adding numbers, joining strings, and adding arrays together.
What + does depends entirely on what type of things you’re adding together.

A better Ruby Example of a common demonstration of polymorphism:


>>>>THIS EXAMPLE ALSO DEMONSTRATES "INHERITANCE"!!!<<<<

  class Animal
    attr_accessor :name

    def initialize(name)
      @name = name
    end
  end

  class Cat < Animal
    def talk
      "Meaow!"
    end
  end

  class Dog < Animal
    def talk
      "Woof!"
    end
  end

  animals = [Cat.new("Flossie"), Dog.new("Clive"), Cat.new("Max")]

  animals.each do |animal|
    puts animal.talk
  end

  Meaow!
  Woof!
  Meaow!


This demonstration shows how you can loop over and work on objects of different classes, but get the
expected results in each case if each class implements the same methods.

If you were to create new classes under the Cat or Dog classes with inheritance (for example, class
Labrador < Dog ), then Labrador.new.talk would still return “ Woof !” thanks to INHERITANCE.


INHERITANCE: is a way to reuse code of existing objects, or to establish a subtype from an existing object, or both, depending upon programming language support. In classical inheritance where objects are defined by classes, classes can inherit attributes and behavior from pre-existing classes called base classes, superclasses, parent classes or ancestor classes. The resulting classes are known as derived classes, subclasses or child classes. The relationships of classes through inheritance gives rise to a hierarchy.
