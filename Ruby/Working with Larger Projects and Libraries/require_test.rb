require './string_extensions'
#require_relative 'string_extensions'
#load 'string_extensions.rb'


# this file will not work without the class and methods found in the file required above:
puts "This is a test".vowels.join('-');
#=> i-i-a-e




gets
#this is required to keep IRB open in windows after the file has finished exucuting



=begin

Ruby does not include the current directory in the path of directories to search for Ruby files by default,
so you can either specify the current directory specifically by using ./ , as above, or by using require_relative .

So this example is operationally identical to the previous one:


require_relative 'string_extensions'



As well as require and require_relative , you can use load to load external source code files into your program.
"load" requires a full filename, including the .rb suffix, whereas require assumes the .rb suffix.

For example, this code would seem to function identically to the preceding code:


load 'string_extensions.rb'


EXCEPT:  With load , the code is loaded and reprocessed anew each time you use the load method. So you could place it multiple times throughout your code.
require and require_relative , on the other hand, process external files only once.

=end

=begin
Ruby programmers nearly always use require or require_relative rather than load . The effects
of load are useful only if the code in the external file has changed or if it contains active code that will be executed immediately.

However, a good programmer will avoid the latter situation, and external files will only contain classes and modules that will, generally, rarely change.
=end


=begin
LOADING MULTIPLE FILES ON ONE LINE OF CODE:

A commonly used shortcut uses arrays to quickly load a collection of libraries at once. For example:
%w{file1 file2 file3 file4 file5}.each { |l| require l }
 This loads five different external files or libraries with just two lines of code. However, some coders are
not keen on this style, as it can make the code harder to read, even if it’s more efficient.
=end
