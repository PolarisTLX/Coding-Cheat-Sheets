# This game was expanded off of Chapter 6 in the book Beginning Ruby 3rd Edition.

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


class Dungeon
  def add_room(reference, name, description, connections)
    @rooms[reference] = Room.new(reference, name, description, connections)
  end
end


my_dungeon.add_room(:largecave, "Large Cave", "a large cavernous cave", {:west => :smallcave})


my_dungeon.add_room(:smallcave, "Small Cave", "a small cave", {:east => :largecave})



class Dungeon
  def start(location)
    @player.location = location
    show_current_description   # calling the function which is defined below
  end

  def show_current_description
    puts find_room_in_dungeon(@player.location).full_description
  end

  def find_room_in_dungeon(reference)
    @rooms[reference]

  end
end


class Room
  def full_description
    @name + "\n\nYou are in " + @description
  end
end


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


my_dungeon.start(:largecave)


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
