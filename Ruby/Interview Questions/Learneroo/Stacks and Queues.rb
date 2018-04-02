STACKS

https://www.learneroo.com/modules/99/nodes/513

Above you can view a Stack for holding numbers. You can do two things with a stack:

Add (or "push") an item to the top of the stack.
Remove (or "pop") an item off the top of the stack.
You can add items without worrying about the size, but you only can access the top of the stack, not any of the items below.

A Stack returns items in Last-In-First-Out (LIFO) order. This means pop will always retrieve the most recently added item thats still on the stack. This is useful for cases where you track things in the order they happened, such as an "undo" mechanism in a program.



    def do_stuff(ar)
    	stack = []
    	ar.each do |element|
    	  if element == -1
    	  	print "#{stack[-1]} "
    	  	stack.pop()
    	  else
    		#add to our stack
    		stack.push(element)
    	  end

        end
        print "\n"

    end

    t = gets.to_i
    for i in 1..t do
    		n=gets
    		ar = gets.strip.split.map {|i| i.to_i}
    		do_stuff(ar)
    end


Input	                  Correct Output	Your Output
3 5 -1 -1 2 7 11 -1 -1	  5 3 11 7	       5 3 11 7
3 5 -1 -1 2 7 9 -1 -1 5 -1 8 -1 -1	 5 3 9 7 5 8 2     	5 3 9 7 5 8 2
4 -1 5 -1 6 -1    	4 5 6     	4 5 6




QUEUES

https://www.learneroo.com/modules/99/nodes/514

Queues are similar to stacks, but instead of returning items in Last-In-First-Out Order (LIFO) they return them in First-In-First-Out Order (FIFO).

These are the 2 methods a Queue supports:

Add an item to the end of the Queue. (a.k.a "push" or "enqueue")
Remove an item from the front of the Queue. (a.k.a. "pop", "dequeue" or "poll")

Note that a Queue supports the same 2 methods as a Stack, but the 'pop' or 'remove' method is defined differently. remove returns the items that were 'waiting' the longest in the queue, i.e. it takes items from the opposite side of where they get placed in. You can see a Queue in action below by adding numbers with "enqueue" and removing the first number with "dequeue".




Create a Queue with the two methods add and remove. Use your LinkedList class to keep track of the elements internally.

The input will consist of the number t followed by t test cases. Each test case will consist of a number n, followed by n numbers of actual input.

For each number of actual input: If the number is -1, remove the first number in the queue and print it. Otherwise, push the number onto your queue.

In this challenge, there's one more detail: If you get a -1 and there's nothing left in the queue, print -1.

Sample Input

1
7
3 5 -1 6 -1 -1 -1
Sample Output

3 5 6 -1


    def do_stuff(ar)
    	queue = []
    	ar.each do |element|
    	  if element == -1
    	  	if queue.length < 1
    	  		print "-1 "
    	  	else
    	  		print "#{queue[0]} "
    	  		queue.shift()
    	  	end
    	  else
    		#add to our stack
    		queue.push(element)
    	  end

        end
        print "\n"

    end

    t = gets.to_i
    for i in 1..t do
    		n=gets
    		ar = gets.strip.split.map {|i| i.to_i}
    		do_stuff(ar)
    end


Input	Correct Output	Your Output
3 5 -1 6 -1 -1 -1	3 5 6 -1	3 5 6 -1
-1 3 5 -1 -1 -1 2 7 9 -1 -1 5 -1 8 -1	-1 3 5 -1 2 7 9 5	-1 3 5 -1 2 7 9 5
4 -1 5 -1 6 -1	4 5 6	4 5 6
