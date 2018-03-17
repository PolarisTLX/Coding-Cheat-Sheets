You can write methods of your own to handle code blocks. For example:


    def each_vowel(&code_block)
     %w{a e i o u}.each { |vowel| code_block.call(vowel) }
    end


    each_vowel { |vowel| puts vowel }

    a
    e
    i
    o
    u


"each_vowel" is a method that accepts a code block,
This is acheived by the ampersand "&" in "(&code_block)" in the method definition.
It then iterates over each vowel in the literal array %w{a e i o u}
and uses the ".call" method on code_block to execute the code block once for each vowel,
passing in the vowel variable as a parameter each time.



An alternate technique is to use the yield method,
which automatically detects any passed code block and passes control to it:


    def each_vowel
     %w{a e i o u}.each { |vowel| yield vowel }
    end

    each_vowel { |vowel| puts vowel }

    #same result


This example is functionally equivalent to the last,
although it’s less obvious what it does
because you see no code block being accepted in the function definition.
Which technique you choose to use is up to you.


#NOTE Only one code block can be passed at any one time. It’s not possible to accept two or more
#code blocks as parameters to a method. However, code blocks may accept none, one, or more parameters
#themselves. 
