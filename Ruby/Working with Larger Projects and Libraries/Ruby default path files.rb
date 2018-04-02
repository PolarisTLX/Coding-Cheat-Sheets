#Ruby stores the list of directories to search for included files in a special variable called $: (or, if you prefer , $LOAD_PATH ).
#You can see what $: contains by default, using irb :
$:.each { |d| puts d }

#=> C:/Ruby24-x64/lib/ruby/gems/2.4.0/gems/did_you_mean-1.1.0/lib
# C:/Ruby24-x64/lib/ruby/site_ruby/2.4.0
# C:/Ruby24-x64/lib/ruby/site_ruby/2.4.0/x64-msvcrt
# C:/Ruby24-x64/lib/ruby/site_ruby
# C:/Ruby24-x64/lib/ruby/vendor_ruby/2.4.0
# C:/Ruby24-x64/lib/ruby/vendor_ruby/2.4.0/x64-msvcrt
# C:/Ruby24-x64/lib/ruby/vendor_ruby
# C:/Ruby24-x64/lib/ruby/2.4.0
# C:/Ruby24-x64/lib/ruby/2.4.0/x64-mingw32


gets
#this is required to keep IRB open in windows after the file has finished exucuting


=begin

If you want to add directories to this, it’s simple:
$:.push '/your/directory/here'
require 'yourfile'

$: is an array, so you can push extra items to it or use unshift to add an element to the start of the list (if you want your directory to be searched before the default Ruby ones—useful if you want to override Ruby’s
standard libraries).

=end
