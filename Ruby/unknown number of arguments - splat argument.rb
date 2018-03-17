what if you want to print out the all of a user''s friends,
without knowing how many friend names the user will put in ahead of time?

The solution: splat arguments. Splat arguments are arguments preceded by a *,
which tells the program that the method can receive one or more arguments.

def what_up(greeting, *friends)
  friends.each { |friend| puts "#{greeting}, #{friend}!" }
end

what_up("What up", "Ian", "Zoe", "Zenas", "Eleanor")


What up, Ian!
What up, Zoe!
What up, Zenas!
What up, Eleanor!
