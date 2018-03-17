Grab only the integers in an array holding various types:


solved with simple code block:


    odds_n_ends = [:weezard, 42, "Trady Blix", 3, true, 19, 12.345]

    # Add your code below!
    ints = odds_n_ends.select{ |param| param.is_a?(Integer) }

    puts ints

    #=> [42, 3, 19]
