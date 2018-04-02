PROFILING

Whereas benchmarking is the process of measuring the total time it takes to achieve something and comparing those results between different versions of code, profiling tells you what code is taking what amount of time . For example, you might have a single line in your code that’s causing the program to run slowly, so by profiling your code you can immediately see where you should focus your optimization efforts.

Some people consider profiling to be the holy grail of optimization. Rather than thinking of efficient ways to write your application ahead of time, some developers suggest writing your application, profiling it, and then fixing the slowest areas. This is to prevent premature optimization. After all, you might prematurely optimize something that didn’t actually warrant it, but miss out on an area of code that could do with significant
optimization.

HOW TO USE:
Simply use ruby-prof to run your Ruby code and you’ll get a print out of the profiler’s findings. Just type this in Bash:

    ruby-prof example_ruby_script.rb

OUTPUT:

Measure Mode: wall_time
Thread ID: 70368393556200
Fiber ID: 70368397036360
Total: 0.000305
Sort by: self_time

 # %self      total      self      wait     child     calls  name
 # 84.53      0.000     0.000     0.000     0.000        1   Class#new
 #  8.52      0.000     0.000     0.000     0.000        1   [global]#[no method]
 #  4.30      0.000     0.000     0.000     0.000        2   Exception#backtrace
 #  1.33      0.000     0.000     0.000     0.000        2   Exception#exception
 #  1.33      0.000     0.000     0.000     0.000        1   Exception#initialize


#book example:

%self total self wait child calls name
65.46 0.032 0.021 0.000 0.011 2 Integer#times
34.42 0.011 0.011 0.000 0.000 101000 Fixnum#+
0.06 0.033 0.000 0.000 0.032 2 Global#[No method]
0.03 0.000 0.000 0.000 0.000 2 IO#set_encoding
0.02 0.000 0.000 0.000 0.000 1 <Class::Calculator>#count_to_small_number
0.01 0.032 0.000 0.000 0.032 1 <Class::Calculator>#count_to_large_number
0.00 0.000 0.000 0.000 0.000 1 Class#inherited
0.00 0.000 0.000 0.000 0.000 2 BasicObject#singleton_method_added


The first column is the % of time spent within the method
named in the far right column.
In the preceding example, the profiler shows that 65.46 % of the total execution time was spent in the times method in the Integer class.
The second column shows the amount of time in seconds rather than as a percentage.
The calls column specifies how many times that method was called. In our case, times was called only twice. This is true, even though the code block passed to times was run 101,000 times. This is reflected in the number of calls for Fixnum ’s addition (+) method, with 101,000 total calls shown there.


It’s not worth spending time optimizing routines that barely consume any time, so use the profile to find those routines that are using the lion’s share of the CPU, and focus on optimizing those.

TIP:  ruby-prof can also be used from within code, rather than via the ruby-prof program, in order to profile certain pieces of code rather than an entire script. See ruby-prof’s documentation for more information.
