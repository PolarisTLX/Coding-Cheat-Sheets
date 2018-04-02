# NOTE This uses an seperate middleware/gem called OpenURI  "open-uri"

The following snippet of code attempts to download pages from Wikipedia. The third entry, xj3490, refers to a non-existent page and is guaranteed to fail:


Observe here how the ensure block of code is skipped by the retry, unless retry is skipped based on oyur code/structure with number of times. 

    require 'open-uri'
    remote_base_url = "http://en.wikipedia.org/wiki"

    [1900, 1910, 'xj3490', 2000].each do |yr|

     retries = 3

     begin
       url = "#{remote_base_url}/#{yr}"
       puts "Getting page #{url}"
       rpage = open(url)
     rescue StandardError=>e
       puts "\tError: #{e}"
       if retries > 0
           puts "\tTrying #{retries} more times"
           retries -= 1
           sleep 1
           retry
       else
           puts "\t\tCan't get #{yr}, so moving on"
       end
     else
       puts "\tGot page for #{yr}"
     ensure
       puts "Ensure branch; sleeping"
       sleep 1

     end
    end
    The output is:

    Getting page http://en.wikipedia.org/wiki/1900
       Got page for 1900
    Ensure branch; sleeping
    Getting page http://en.wikipedia.org/wiki/1910
       Got page for 1910
    Ensure branch; sleeping
    Getting page http://en.wikipedia.org/wiki/xj3490
       Error: 403 Forbidden
       Trying 3 more times
    Getting page http://en.wikipedia.org/wiki/xj3490
       Error: 403 Forbidden
       Trying 2 more times
    Getting page http://en.wikipedia.org/wiki/xj3490
       Error: 403 Forbidden
       Trying 1 more times
    Getting page http://en.wikipedia.org/wiki/xj3490
       Error: 403 Forbidden
          "Can't get xj3490, so moving on"
    Ensure branch; sleeping
    Getting page http://en.wikipedia.org/wiki/2000
       Got page for 2000
    Ensure branch; sleeping
