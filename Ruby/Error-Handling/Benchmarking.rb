Ruby’s standard library includes a module called Benchmark .

Benchmark provides several methods that measure the speed it takes to complete the code you provide.

For example:

    require 'benchmark'
    puts Benchmark.measure { 10000.times { print "." } }

This code measures how long it takes to print 10,000 periods to the screen. Ignoring the periods produced, the output will look as follows:

    0.050000 0.040000 0.090000 ( 0.455168)

The columns, in order, represent the amount of:

  user CPU time, system CPU time, total CPU, and “real” time taken.


In this case, it took 0.09 seconds of CPU time to send 10,000 periods to the screen or terminal,
But it took almost 0.50 seconds for them to finish being printed to the screen among all the other things the computer was doing.


The .measure method accepts  code blocks, so you can make it do whatever you want!


    require 'benchmark'
    iterations = 1000000

    b = Benchmark.measure do
      for i in 1..iterations do
        x = i
      end
    end

    c = Benchmark.measure do
      iterations.times do |i|
        x = i
      end
    end

    puts b
    puts c

 In this example, you benchmark two different ways of counting from one to one million. The results might look like this:

    0.800000 0.010000 0.810000 ( 0.949338)
    0.890000 0.010000 0.900000 ( 1.033589)



The ".bm" method provides a way to make completing multiple tests more convenient. ".bm" makes the results even easier to read and provides headings for each column.
You can rewrite the preceding benchmarking scenario like this:

    require 'benchmark'
    iterations = 1000000

    Benchmark.bm do |bm|
      bm.report("for:") do
        for i in 1..iterations do
          x = i
        end
      end
      bm.report("times:") do
        iterations.times do |i|
          x = i
        end
      end
    end

The primary difference with using the bm method is that it allows you to collect a group of benchmark tests together and display the results in a prettier way. Example output for the preceding code is as follows:

             User   system    total        real
    for: 0.850000 0.000000 0.850000 ( 0.967980)
    times: 0.970000 0.010000 0.980000 ( 1.301703)


The ".bmbm" method exists to be able to repeat the benchmark twice. This accounts for things like CPU caching or memory caching which could taint the results.
So it treats the first test as a "rehearsal", and the 2nd as the true result.  The latter being the more accurate result.
