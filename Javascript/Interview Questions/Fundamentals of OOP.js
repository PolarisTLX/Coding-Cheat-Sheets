FUNDAMENTALS OF OOP OBJECT ORIENT PROGRAMING:
-Encapsulation
-Polymorphism
-Inheritance

See files "Object Methods" and "Polymorphism Table" for more details and examples.


ENCAPSULATION:
Distinguishing between internal complexity and external interface.
INTERFACE: can be a method/functin that is called on to intereact with a more complex object

One of several concepts for objects in object oriented programming,
as the interface of an object is usually simpler in complexity then its internal content

Its can be a useful thing to do with objects is to specify an interface for them
and tell everybody that they are supposed to talk to your object only through that interface.
The rest of the details that make up your object are now encapsulated, hidden behind the interface.

Once you are talking in terms of interfaces, who says that only one kind of object may implement this interface?
Having different objects expose the same interface
and then writing code that works on any object with the interface is called polymorphism.
It is very useful.


Problems with encapsulation:
Encapsulation should not be applied to small projects for these 2 reasons:

1. Encapsulation takes extra effort and makes programs bigger,
it requires additional concepts and interfaces to be introduced.
To prevent confusion, keep program small if possible.

2. The various elements of this game are so closely tied together,
that if the behavior of one changed, it is unlikely that any of the others
would be able to stay the same.
Interfaces would need to have incorporated a lot of assumptions which makes them less effective,
and whenever you change one part of the system, youll have to worry about the way it impacts the other parts,
because their interfaces wouldnt cover the new situation.

Trying to encapsulate something that isnt an ideal/suitable boundary will end up wasting a lot of energy and time.
Youll notice your interfaces get awkwardly large and will need to be modified often as the program evolves.




INHERITANCE:
To avoid writting a whole new constructor with all three methods,
we can do something clever, because prototypes may themselves have prototypes:

Inheritance allows us to build slightly different data types from existing data types with relatively little work.

RTextCell becomes basically equivalent to a TextCell,
except that its draw method contains a different functin.

NOTE:  inheritance is often confused with polymorphism.
inheritance fundamentally ties types together, and can creat tangle in your code.
You should see it as a slightly dodgy trick that can help you define new types with little code
A preferable way to extend types is through composition (see UnderlinedCell in the Polymorphic Table exercise).

PLYMORPHISM:
One of the CORE PRINCIPALS of Object Oriented Programming (OOP).
It is the practice of designing objects to share behaviors
and to be able to override shared behaviors with specific ones.
Polymorphism takes advantage of inheritance in order to make this happen.

Example: When you call the String functin, which converts a value to a string,
on an object, it will call the .toString() method on that object to try to create a meaningful string to return.

Having different objects expose the same interface(method/functin) and then writing code that works on any object with the interface is called polymorphism.
