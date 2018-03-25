Encapsulation

Think of the complex engine operated by just a on/off switch.
It keeps things simple for users,
A simple interface keep the complex innards of objects hidden/protected.

...helps you keep a lot of functionality within your classes, but gives you the security
of only having a few ways for the outside world to manipulate your object’s data




An example of encapsulation in Ruby :


setting   public  and private  to your methods in your classes.

class Person
  def anyone_can_access_this
    ...
  end

  public

  def another_public_method
    ...
  end

  private

  def this_is_private
    ...
  end
end





Ruby supports a third form of encapsulation (other than public and private ) called protected that
makes a method private, but within the scope of a class rather than within a single object. For example, you
were unable to directly call a private method outside the scope of that object and its methods. However, you
can call a protected method from the scope of the methods of any object that’s a member of the same class:

(Example on page 124 of Beginning Ruby 3rd Edition)
http://file.allitebooks.com/20160718/Beginning%20Ruby.pdf
