https://www.learneroo.com/modules/99/nodes/525

Dynamic Array Library Class
An ArrayList is Java''s class for Dynamic Arrays. See Learneroos ArrayList Tutorial or the ArrayList reference for more info. In Ruby and Javascript the Array is actually a Dynamic Array, as is the List in Python.

ArraysLists vs. LinkedLists
The ArrayList provides 'instant' access to any location inside them, while the LinkedList needs to iterate through the list to get to a specific location. However, the LinkedList can insert and delete items without copying over data, and it doesn't need to copy over data when full, since it doesn't use an internal array.

In general you should use an ArrayList since it performs better overall. However, if you are going to be inserting or deleting a large number of items and rarely access items by index value, a LinkedList can be faster.
