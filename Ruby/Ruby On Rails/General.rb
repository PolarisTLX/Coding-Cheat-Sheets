http://tutorials.jumpstartlab.com/projects/blogger.html



    <h1>All Articles</h1>

    <ul id="articles">
      <% @articles.each do |article| %>
        <li>
          <%= article.title %>
        </li>
      <% end %>
    </ul>


    
ERB is a templating language that allows us to mix Ruby into our HTML. There are only a few things to know about ERB:

An ERB clause starts with <% or <%= and ends with %>
If the clause started with <%, the result of the ruby code will be hidden
If the clause started with <%=, the result of the ruby code will be output in place of the clause
