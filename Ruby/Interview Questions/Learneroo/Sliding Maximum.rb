https://www.learneroo.com/modules/95/nodes/486

    def do_stuff(ar, k)
    	#your code here
    	i = 0
    	while i < ar.length-k+1
    		#queue = [ar[i], ar[i+1], ar[i+2]]
    		queue = ar[i..i+k-1]
    		print "#{queue.max} "
    		i += 1
    	end
    	print "\n"

    end

    #boilerplate code
    t = gets.to_i
    for i in 1..t do
    	temp = gets
    	ar = gets.strip.split.map {|i| i.to_i}
    	do_stuff(ar[1..-1], ar[0])
    end


now for a more optomized solution (using proper queue push and pop) :


    def do_stuff(ar, k)
    	#your code here
    	#starting queue
    	i = 0
    	queue = ar[0..k-1]
    	while i < ar.length-k+1
    		print "#{queue.max} "
    		queue.shift  #remove the first item
    		queue.push(ar[i+k])  #add the next item in the array to the queue
    		i += 1
    	end
    	print "\n"

    end

    #boilerplate code
    t = gets.to_i
    for i in 1..t do
    	temp = gets
    	ar = gets.strip.split.map {|i| i.to_i}
    	do_stuff(ar[1..-1], ar[0])
    end
