=begin
This game was expanded off of Chapter 6 in the book Beginning Ruby 3rd Edition.

Dungeon : You need a general class that encapsulates the entire concept of the dungeon game.

Player : The player provides the link between the dungeon and you. All experience of the dungeon comes through the player. The player can move between rooms in the dungeon.

Rooms : The rooms of the dungeon are the locations that the player can navigate between. These will be linked together in multiple ways (doors to the north, west, east, and south, for example) and have descriptions.


If you want you can extend this into a more complete game with weapons, enemies etc...

=end



class Dungeon  #This is the main class that holds everything,
  #classes like Player and Room  are placed here in nested classes.

  attr_accessor :player

  def initialize(player)
    @player = player
    @rooms = {}
  end
end

class Player
  #attr_reader
  #attr_writer
  attr_accessor :name, :location

  def initialize(player_name)
    @name = player_name
  end
end


class Room
  attr_accessor :refence, :name, :description, :connections

  def initialize(reference, name, description, connections)
    @reference = reference
    @name = name
    @description = description
    @connections = connections
  end
end


me = Player.new("Fred Bloggs")
my_dungeon = Dungeon.new(me)
puts my_dungeon.player.name
#=>  "Fred Bloggs"


# we want to now add a method to the Dungeon class to be able to create a room:

class Dungeon
  def add_room(reference, name, description, connections)
    @rooms[reference] = Room.new(reference, name, description, connections)
  end
end

#Now you can create rooms like so:

my_dungeon.add_room(:largecave, "Large Cave", "a large cavernous cave", {:west => :smallcave})

# NOTE :largecave is written as a symbol, because it will be used in the  hash  " @rooms = {} " ?

my_dungeon.add_room(:smallcave, "Small Cave", "a small cave", {:east => :largecave})


# add_room accepts the reference , name , description , and connections arguments and creates a new Room object with them before adding that object to the @rooms hash.

# The connections argument is designed to accept a hash that represents the connections that a particular room has with other rooms. For example, { :west => :smallcave } ties two symbols (:west and :smallcave ) together.
# Your dungeon logic uses this link to connect the rooms.
# A connections hash of { :west => :smallcave, :south => :another_room } would create two connections (one to the west heading to “small cave”, and one to the south heading to “another room”).


# everything must start off by placing the user into the dungeon and giving them the description of the initial location.


class Dungeon
  def start(location)
    @player.location = location
    show_current_description   #calling the function which is defined below
  end

  def show_current_description
    # prints the name of the current room
    puts find_room_in_dungeon(@player.location).full_description
  end

  def find_room_in_dungeon(reference)
    @rooms[reference]
    # find_room_in_dungeon , is passed @player.location above, and so it returns the room whose reference matches that of the current location.
  end
end

#adding the description method to the Room class for the above to make sense

class Room
  def full_description
    @name + "\n\nYou are in " + @description
  end
end

# Now add methods for navigating the dungeun:

class Dungeon
  def find_room_in_direction(direction)
    find_room_in_dungeon(@player.location).connections[direction]
  end

  def go(direction)
    # Error checking:
    # need to first check if the provided direction is valid.
    # need to see if it exits in the connections hash

    # does direction exist in @rooms[connections] ?
    # format: my_hash.include?(:key1) #=> True
    if @rooms[@player.location].connections.include?(direction) == false
      puts "You can't go that way."
    else
      puts "You go " + direction.to_s
      # below changes the location of the player:
      @player.location = find_room_in_direction(direction)
      show_current_description
    end
  end
end


# Remember that you define a room like so:
#
#     my_dungeon.add_room(:largecave,
#      "Large Cave",
#      "a large cavernous cave",
#      { :west => :smallcave })
#
# If :largecave is the current room, then find_room_in_direction(:west) will use the connections on
# that room to return : smallcave ,
# and this is then assigned to @player.location to define that as the new current location.


# Start the dungeon by placing the player in the large cave :

my_dungeon.start(:largecave)
#=> Large Cave
#=> You are in a large cavernous cave


# Testing navigation:
my_dungeon.show_current_description
#=> Large Cave
#=> You are in a large cavernous cave

my_dungeon.go(:west)
#=> You go west
# Small Cave
# You are in a small, claustrophobic cave
my_dungeon.go(:east)
#=> You go east
# Large Cave
# You are in a large cavernous cave


# CODE WORKS UP TO HERE


This code is rife for extension and manipulation. With another class and several more methods you
could easily add support for items within the game that you can place at different locations, pick up, and
then drop at other locations.

 If you want an exercise, you can try turning the preceding dungeon code into a truly interactive program
by creating a loop that uses the gets method to retrieve instructions from the player and then to “go”
wherever the player determines. You can use chomp to strip off the newline characters from the incoming
text, and to_sym to convert strings into symbols for the go method. This might seem like a tough task at this
stage, but if you pull it off I guarantee you’ll have learned a lot and you’ll be confident about going on to the
next chapter.

 In Chapter 9 you’ll look at how to interact with files and read data from the keyboard. At that point,
you could extend the dungeon game to be properly interactive and accept input from the user, validate that
it represents a valid direction, and then call the go method if so. With these additions and the addition of
several more rooms, you’re most of the way to a viable text adventure!
