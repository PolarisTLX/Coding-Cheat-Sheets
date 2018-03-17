print only the even number of the given array:

my_array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

my_array.each { |n| puts n if n % 2 == 0 }

#=>
# 2
# 4
# 6
# 8
# 10
