Ruby provides basic support for HTTP via the net/http library.

For example, it’s trivial to write a Ruby
script that can download and print out the contents of a particular web page:

require 'net/http'

Net::HTTP.get_print('www.rubyinside.com', '/')


If you ran this code, after a few seconds many pages of HTML code should fly past on your screen.

The first line loads the net/http library into the current program, and the second line calls a class method on the  Net::HTTP class (where Net is a module defining the Net namespace, and HTTP is a subclass) that gets and prints (hence get_print ) the web page at http://www.rubyinside.com/ .




It’s just as easy to put the contents of any web page into a string, for further manipulation by your program:

require 'net/http'

url = URI.parse('http://www.rubyinside.com/')

response = Net::HTTP.start(url.host, url.port) do |http|
  http.get(url.path)
end

content = response.body



In this example, you use the URI library (another standard library, and one that’s loaded automatically
by net/http) to decipher a URL such as http://www.rubyinside.com/ into its constituent parts for the net/http library to use to make its request.

Once the URL has been parsed, an HTTP connection is “started,” and within the scope of that connection, a GET request is made with the get method (if this doesn’t make sense, don’t worry; it’s part of how the HTTP protocol works).

Finally, you retrieve the content from response.body , a string containing the contents of the web page at http://www.rubyinside.com/ .
