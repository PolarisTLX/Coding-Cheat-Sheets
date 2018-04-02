When an exception is raised, they halt the execution of the program and trace their way back up the stack to find some code that can handle them.

If no handler for the exception is found, the program ceases execution and dies with an error message with information about the exception.

However, in most situations, stopping a program because of a single error isn’t necessary. The error
might only be minor, or there might be an alternative option to try. Therefore, it’s possible to handle
exceptions.



BEGIN / RESCUE / ELSE/ ENSURE :

Its basically the same as if/else.

In Ruby, the rescue clause is used, along with begin and end , to define blocks of code to handle
exceptions. For example:

    begin
     puts 10 / 0
    rescue
     puts "You caused an error!"
    #else
      # OPTIONAL ELSE STATEMENT
    # ensure  # optional ensure
      # This code will execute whether an error/exception was rescued or not.
    end

    #=>You caused an error!

First, you try to work out ten divided by zero, which raises an exception of class ZeroDivisionError .

However, being inside a block containing a rescue section means that the exception is handled by the code inside that rescue section.

Rather than dying with a ZeroDivisionError , the text "You caused an error!" is instead printed to the screen.


a = 10
b = "42"

begin
   a + b
rescue
   puts "Could not add variables a (#{a.class}) and b (#{b.class})"
else
   puts "a + b is #{a + b}"
end



EXAMPLE - LOAD BACKUP DATA WHEN EXPECTED EXTERNAL DATA FAILS :

    data = ""

    begin
       <..code to retrieve the contents of a Web page..>
       data = <..content of Web page..>
    rescue
       puts "The Web page could not be loaded! Using default data instead."
       data = <..load data from local file..>
    end

    puts data


Here, if retrieving the contents of a webpage fails (if you’re not connected to the Internet, for example), then the error-handling routine rescues the exception, alerts the user of an error, and then loads some data from a local file instead.




FOR REACTING DIFFERENTLY TO DIFFERENT ERRORS :

You might want to react differently if there’s a fatal flaw in the code, versus a simple error such as a lack of network connectivity.

It’s possible to rescue different types of exceptions in a different way.  There might also be errors you want to ignore, and only specific exceptions you wish
to handle.

rescue ’s syntax makes handling different exceptions in different ways easy:

    begin
      ... code here ...
    rescue ZeroDivisionError
      ... code to rescue the zero division exception here ...
    rescue YourOwnException
      ... code to rescue a different type of exception here ...
    rescue
      ... code that rescues all other types of exception here ...
    end

This code contains multiple rescue blocks, each of which is caused depending on the type of exception
raised. If a ZeroDivisionError is raised within the code between begin and the rescue blocks, the rescue
ZeroDivisionError code is executed to handle the exception.


PASSING EXCEPTIONS/ERRORS - similar to passing events! :

The exception is an object like any other!

It’s possible to "receive" exceptions and "pass" them so you can use them.
This is particularly useful if the exception class contains extra functionality or attributes that you want to access.

This is achieved with a little extra syntax on the rescue block:

    begin
      puts 10 / 0
    rescue => e     #<-- here the exception is received, given the name "e" and passed below:
      puts e.class
    end

    #=> ZeroDivisionError

"e" can be whatever name you want:

rescue => applebottom   #<-- This works just fine.
  puts applebottom.class



EXCEPTION VS STANDARD ERROR :
http://ruby.bastardsbook.com/chapters/exception-handling/



ENSURE
http://ruby.bastardsbook.com/chapters/exception-handling/


RETRY :
http://ruby.bastardsbook.com/chapters/exception-handling/

    for i in 'A'..'C'
      retries = 2
      begin
        puts "Executing command #{i}"
        raise "Exception: #{i}"
      rescue Exception=>e
        puts "\tCaught: #{e}"
        if retries > 0
          puts "\tTrying #{retries} more times\n"
          retries -= 1
          sleep 2
          retry
        end
      end
    end

    # Executing command A
    #    Caught: Exception: A
    #    Trying 2 more times
    # Executing command A
    #    Caught: Exception: A
    #    Trying 1 more times
    # Executing command A
    #    Caught: Exception: A
    # Executing command B
    #    Caught: Exception: B
    #    Trying 2 more times
    # .
    # .
    #    Caught: Exception: C
    #    Trying 1 more times
    # Executing command C
    #    Caught: Exception: C



The retry statement redirects the program back to the begin statement. This is helpful if your begin/rescue block is inside a loop and you want to retry the same command and parameters that previously resulted in failure.
