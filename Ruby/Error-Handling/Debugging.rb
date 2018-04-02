THE RUBY DEBUGGER


NOTE:  Many Ruby developers don’t use the debugger particularly often, as its style of debugging and its workflow can seem a little out of date compared to modern techniques such as test-driven development and unit testing , which we’ll look at next chapter (of Beginning Ruby). 
If the debugger seems like it could be useful, testing will make you drool.

Ruby provides a debugging tool you can use to step through your code line by line (if you wish),
set breakpoints (places where execution will stop for you to check things out), and debug your code.

It’s a little like irb, except you don’t need to type out a whole program. You can specify your program’s filename, and you’ll be acting as if you are within that program.




For example, create a basic Ruby script called debugtest.rb :

    i = 1
    j = 0
    until i > 1000000
      i *= 2
      j += 1
    end

    puts "i = #{i}, j = #{j}"

 If you run this code with ruby debugtest.rb , you’ll get the following result:

    i = 1048576, j = 20


But say you RUN IT WITH THE RUBY DEBUGGER like this:

    ruby –r debug debugtest.rb

You’ll see something like this appear:

    Debug.rb
    Emacs support available
    debugtest.rb:1:i = 1 (rdb:1)

This means the debugger has loaded.
The third line shows you the current line of code ready to be executed (the first line, in this case),
and the fourth line is a prompt that you can type on.

You can set breakpoints and “watches” (breakpoints that rely on a certain condition becoming true—for example, to stop execution when x is larger than 10)



HERE ARE THE MOST USEFUL COMMANDS TO USE AT THE DEBUGGER PROMPT:

• list : Lists the lines of the program currently being worked upon. You can follow list by a range of line numbers to show. For example, list 2-4 shows code lines 2 through 4. Without any arguments, list shows a local portion of the program to the current execution point.

• step : Runs the next line of the program. step literally steps through the program line by line, executing a single line at a time. After each step, you can check variables, change values, and so on. This allows you to trace the exact point at which bugs occur. Follow step by the number of lines you wish to execute if it’s higher than one, such as step 2 to execute two lines.

• cont : Runs the program without stepping. Execution will continue until the program ends, reaches a breakpoint, or a watch condition becomes true .

• break : Sets a breakpoint at a particular line number, such as with break 3 to set a breakpoint at line 3. This means that if you continue execution with cont , execution will run until line 3 and then stop again. This is useful for stopping execution at a
place where you want to see what’s going on.

• watch : Sets a condition breakpoint. Rather than choosing a certain line upon which to stop, you specify a condition that causes execution to stop. For example, if you want the program to stop when x is larger than 10, use watch x > 10 . This is perfect for discovering the exact point where a bug occurs if it results in a certain condition becoming true .

• quit : Exits the debugger.


YOU CAN EVEN CHANGE VARIABLES IN-SITU ? with just stating it  like "i = 250" in the debugger prompt?

A simple debugging session with your debugtest.rb code might look like this:

   cd/mnt/c/Users/Admin/Documents/GitHub/Coding-Cheat-Sheets/Ruby/Error-Handling/

   ruby debugger-example.rb
   #=> i = 1048576, j = 20


   ruby -r debug debugger-example.rb
   #=> Debug.rb
   # Emacs support available.
   # debugger-example.rb:1:i = 1

   list
    # [-4, 5] in debugger-example.rb
    # => 1  i = 1
    #   2  j = 0
    #   3  until i > 1000000
    #   4    i *= 2
    #   5    j += 1

    step
    # debugger-example.rb:2:j = 0

    list
    # [-3, 6] in debugger-example.rb
    #    1  i = 1
    # => 2  j = 0
    #    3  until i > 1000000
    #    4    i *= 2
    #    5    j += 1
    #    6  end

    i
    # i = 0

    j
    # j = 0

    watch i > 1000
    # Set watchpoint 1:i > 1000

    cont
    # Watchpoint 1, toplevel at debugger-example.rb:5
    # debugger-example.rb:5:  j += 1

    i
    # i = 1024

    j
    # j = 9
