books = ["Charlie and the Chocolate Factory", "War and Peace", "Utopia", "A Brief History of Time", "A Wrinkle in Time"]

# To sort our books in ascending order, in-place
books.sort! { |firstBook, secondBook| firstBook <=> secondBook }

# Sort your books in descending order, in-place below

puts books.sort! { |firstBook, secondBook| secondBook <=> firstBook }


["War and Peace", "Utopia", "Charlie and the Chocolate Factory", "A Wrinkle in Time", "A Brief History of Time"]

# Sort the strings by the last letter only.
# can be modified to pick any letter in either string

puts books.sort! { |firstBook, secondBook| secondBook[-1] <=> firstBook[-1] }

["Charlie and the Chocolate Factory", "War and Peace", "A Wrinkle in Time", "A Brief History of Time", "Utopia"]
