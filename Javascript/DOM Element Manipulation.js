This chapter in Eloquent JavaScript talks about the browser wars and compatibility.

NETWORK & THE INTERNET



THE DOM:  Document Object Model

Every element in the DOM is a node,
and every node has the following properties:

document.body holds all of the nodes.

.childNodes : (array-like object holding all its children below it, 0, 1, 2...)


.firstChild : points to first child below a node, or "null" if there are no children
.lastChild : points to last child below a node, or "null" if there are no children

.previousSibling : point to sibling node above current one. "null" if there are none before it.
.nextSibling : point to sibling node below current one. "null" if there are none after it.

.nodeValue : the string of text that resides in the node.


SPECIAL NOTE:  text nodes are created even for the whitespace between nodes?


EXAMPLE:

<body>
   <h1>My home page</h1>
   <p>Hello, I am Marijn and this is my home page.</p>
   <p>I also wrote a book! Read it <a href="http://eloquentjavascript.net">here</a>.</p>
</body>

This documents body does not have 3 children (h1, p, p),
it ACTUALLY have 7 children?  (space, h1, space, p, space, p, space).

There are different kinds of nodes, called "node constant types"
Elements, like <p> or <h3>  are a kind of node.
You mostly work with the element sort when manipulating the DOM?

"node constant types":
1. Regular elements: document.ELEMENT_NODE    =   <p>, <div>  etc.
2. Text nodes: document.TEXT_NODE             = the actual text string within an element node like <p>
      NOTE: Text nodes cannot have children, they are always a leaf (end of the branch)
      ADDITIONAL NOTE: empty space is actually of TEXT_NODE type
      that gets automatically put in between nodes (as per example above with 7 children)  (between all nodes always?)
3. Comments: document.COMMENT_NODE            = any code you comment out with <!---->

(more info if desired: https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType)




Function that acts as a simple CTRL-F for the page you are on. scans a document (page or html file) for specific words.
The word is a string, and it would have to be present within the text of one of the nodes.
Returns true if it has found an occurence.  It is recursive.


    function talksAbout(node, string) {
      if (node.nodeType == document.ELEMENT_NODE) {
        for (var i = 0; i < node.childNodes.length; i++) {
          if (talksAbout(node.childNodes[i], string)) {
            return true;
          }
        }
        return false;
      } else if (node.nodeType == document.TEXT_NODE) {
        return node.nodeValue.indexOf(string) > -1;
      }
    }


// "document.body" is the page you are on when you run this in the console.
console.log(talksAbout(document.body, "book"));
// true
console.log(talksAbout(document.body, "nested"));
// true
console.log(talksAbout(document.body, "JavaScript also gives you access to a number of additional "));
// true


FINDING ELEMENTS:

To get the href attribute of the link in the example document body:

// get the first link:
var link = document.body.getElementsByTagName("a")[0];
// [0] is to get the first occurence.
// get that link's href
console.log(link.href);


All element nodes have a "getElementsByTagName('chosenTag')". this returns an array-like object of whatever chosen tag.

Same for "getElementsByClassName"


TO GET A SPECIFIC SINGLE NODE:
give that node an ID attribute and use "getElementById".
Recall that an ID can only be given to one unique element.

IMPORTANT NOTE there is no "s" in "Element" in "getElementById",
unlike the others, which are "getElementsBy..."


MANIPULATING / CHANGING ELEMENTS IN THE DOM
METHODS TO CHANGE THE CONTENT OF THE ELEMENT NODES:

.removeChild : removes given child element from the document.
.appendChild : adds a child to the end of the list of elements children.
.insertBefore(x, y) : adds a child between 2 elements.
.insertBefore(elementToMove, elementItWillMoveInFrontOf)
.replaceChild(newElement, ElementToBeReplaced) : Move and replace(delete)

Example (seperate html file created to demonstrate fully / experiment):

This example Moves <p>Three</p> to be before <p>One</p>.
Using   .insertBefore(paragraphs[2], paragraphs[0])

    <html>
      <body>

        <p>One</p>
        <p>Two</p>
        <p>Three</p>

      </body>

      <script>
        var paragraphs = document.body.getElementsByTagName("p");
        document.body.insertBefore(paragraphs[2], paragraphs[0]);
      </script>

    </html>

    // Three
    // One
    // Two

    If instead : .insertBefore(paragraphs[2], paragraphs[0]);

    // Three
    // Two


CREATING A NEW NODE:

document.createElement() : create regular element node type. This method takes a tag name, and returns a new empty element of that tag type. Ex (p, div, img)?
document.createTextNode() : creates a piece of text string that we can insert somewhere.

This example replaces the images in the html document with the "alt" text of each image when you click the "replace" button.

    <html>
      <body>
        <p>The <img alt = "CAT" src="https://s7d1.scene7.com/is/image/PETCO/cat-category-090617-369w-269h-hero-cutout-d?fmt=png-alpha"> in the <img alt="HAT" src="https://www.villagehatshop.com/photos/product/standard/4511390S163373/all/stovepipe-wool-felt-top-hat.jpg">.</p>
        <button onClick="replaceImages()">Replace</button>
      </body>

      <script>
        function replaceImages() {
          var images = document.body.getElementsByTag("img");
          // typical pattern of a loop wont work here,
          // because the nodelist of "images" is updated live each time we run through it,
          // so it is length of 2, then 1 after first loop, then 0 after next loop.
          // so you want to just start grabbing the items from the end.
          for (var i = images.length - 1; i >= 0; i--) {
         // var image = images[i];  //this extra variable not needed
         // var text = document.createTextNode(image.alt);
         // image.parentNode.replaceChild(text, image);
            var text = document.createTextNode(images[i].alt);
            images[i].parentNode.replaceChild(text, images[i]);
          }
        }
      </script>

    </html>

If you want a SOLID collection of NODES, AS OPPOSED TO A LIVE ONE:
convert the collection of nodes into a real array,
by calling the array slice method on it:

    var arrayish = {0: "one", 1: "two", length: 2};
    var real = Array.prototype.slice.call(arrayish, 0);
    real.forEach(function(element) {  console.log(element); });
    // one
    // two


EXAMPLE WITH document.createElement():

This functin defines a utility, element,
creates an element node, then treats the rest of its arguments as children of that node.
Then is adds a simple attribution to a quote:
(This example adds more text to end of an element of type "<blockquote>" )

    <blockquote id="quote">
    No book can ever be finished. While working on it we learn just enough to find it immature the moment we turn away from it.
    </blockquote>

    <script>
      function element(type) {
        var node = document.createElement(type);
        for (var i = 1; i < arguments.lengt; i++) {
          var child = arguments[i];
          if (typeof child == "string") {
            child = document.createTextNode(child);
          }
          node.appendChild(child);
        }
        return node;
      }

      document.getElementById("quote").appendChild(
        element("footer", "-",
          element("strong", "Karl Popper"),
          ", preface to the second edition of ",
          element("em", "The Open Society and Its Enemies"),
          ", 1950"));

      // This creates and adds the following inside of the <blockquote> element (at the end):
      //
      //   <footer>
      //     "-"
      //     <strong>Karl Popper</strong>
      //     ", preface to the 2nd edition of "
      //     <em>The Open Society and Its Enemies</em>
      //     ", 1950"
      //   </footer>
    <script>

Thus the final HTML code in the browser will be this:

    <blockquote id="quote">
        No book can ever be finished. While working on it we learn just enough to find it immature the moment we turn away from it.
          <footer>
            "-"
            <strong>Karl Popper</strong>
            ", preface to the 2nd edition of "
            <em>The Open Society and Its Enemies</em>
            ", 1950"
          </footer>
    </blockquote>

Which displays as:

    No book can ever be finished. While working on it we learn just enough
    to find it immature the moment we turn away from it.
    -Karl Popper, preface to the 2nd edition of The Open Society and Its Enemies, 1950



ATTRIBUTES:

There are some element attributes that are standard and can be accessed and interacted with
through a property of their name itself, such as "href".
But this applies only to a limited set of these standard (commonly used) attributes.

You can still set any attribute you want on any node in HTML,
which can be useful to store extra information within the elements in your document.
However, these non-standard attributes cannot be accessed via the normal property method for nodes.
Instead you have to use the methods "getAttribute" and "setAttribute" to work with them.

It is recommended to use a naming convention of adding the prefix "data-"
to any of these non-standard attributes.


Example of manipulating non-standard attributes:
(Anything that has attribue "data-classified" == "secret", gets removed)

    <p data-classified="secret">The password is 000000.</p>
    <p data-classified="unclassified">I have two feet.</p>

    <script>
      var allParagraphs = document.body.getElementsByTagName("p");
      Array.prototype.forEach.call(allParagraphs, function(eachParagraph) {
        if (eachParagraph.getAttribute("data-classified") == "secret") {
          eachParagraph.parentNode.removeChild(eachParagraph);
        }
      });

      // The password is 000000.  <- This gets removed
      // I have two feet.

    </script>


EXAMPLE - MAKE TARGET WORDS BOLD:

<!-- Also in seperate file, section originally called
Highlight Syntax Example
But this is poorly described in the book EloquentJS,
It only shows how to make certain target words BOLD
By adding <strong></strong> elements around them -->

This looks for "<pre>" tags (which means "preformated"),
with a "data-language" attribute,
It takes a "<pre>" element node, and a RegExp with the global "g" option,
that matches the keywords of the programming language that the element contains.

The keywords provided in this example by the RegExp are: (function|return|var)

All occurences of these keywords will be made bold with <strong> around them.
by looping over all the <pre> elements that have a data-language attribute
and calling highlightCode on each one with the correct RegExp for the language.


    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title></title>
      </head>
      <body>

    <p>This example makes certain target words become bold by adding "strong" elements around them.</p>
    <pre data-language="javascript"> function id(x) { return x; } </pre>


    <script>

    highlightAllCode();

    function highlightCode(node, keywords) {
      // grab all the text in the node:
      var text = node.textContent;
      // then clear it / set it to an empty string:
      node.textContent = "";

      // loop over all matches of the keyword expression,
      var match, pos = 0;  //pos = position index?
      while (match = keywords.exec(text)) {
        // the text between them gets appended as regular text nodes (.createTextNode())
        // the text "before" and "after"?  After is lower in the code?
        var before = text.slice(pos, match.index);
        node.appendChild(document.createTextNode(before));

        // the text matched (the keywords),
        // will now become text nodes wrapped in "<strong>" tags to make text bold.
        var strong = document.createElement("strong");
        strong.appendChild(document.createTextNode(match[0]));
        node.appendChild(strong);
        pos = keywords.lastIndex;
      }
      // the part after a keyword that was matched?
      // just like "before", gets added/appended without bold tags
      var after = text.slice(pos);
      node.appendChild(document.createTextNode(after));
    }

    function highlightAllCode() {
      var pres = document.body.getElementsByTagName("pre");  // <pre>
      for (var i = 0; i < pres.length; i++) {
        var lang = pres[i].getAttribute("data-language");

        // BOOK GOT THIS WRONG
        // AS THIS WAS PLACED OUTSIDE THE FUNCTION AND COULD NOT BE ACCESSED / was "undefined"
        var languages = {  javascript: /\b(function|return|var)\b/g   };

        if (languages.hasOwnProperty(lang)) {
          highlightCode(pres[i], languages[lang]);
        }
      }
    }
    </script>
    </body>
    </html>


LAYOUT

A browser computes a layout by giving each element a size and position
based on their element type and the content.

Block-elements VS inline-elements

Block elements take up a whole width of the page, and are rendered on seperate lines.
Ex: <p>, <h1>

inline-elements dont take up the whole width by themselves,
are rendered on the same line as their surrounding text.
Ex: <a>, <strong>

Recall that each element has a size and position, JavaScript is able to access these details.

Properties of elements:

offsetWidth / offsetHeight : give you the space the element takes up in pixels.
clientWidth / clientHeight : give you the size and space of the element WITHOUT its border thickness.
                             Or can view it as the space inside the element.


    <p style="border: 3px solid red">"I'm boxed in"</p>

    <script>
      var para = document.body.getElementsByTagName("p")[0];
      console.log("clientHeight:", para.clientHeight);
      // 18     (this does is the smaller size as it does not have the border included)
      console.log("offsetHeight:", para.offsetHeight);
      // 24    (this includes 3px border on both sides)
    </script>


THE BEST WAY TO GET A PRECISE POSITION OF AN ELEMENT:
getBoundingClientRect

this object returns the.. bounding client rectangle?
it has a top, bottom, left and right properties.
The pixel co-ordinates of the element relative to the top left of the screen, which is (0,0)


TO GET POSITION RELATIVE TO WHOLE DOCUMENT VS RELATIVE TO TOP OF SCREEN:
Must add the current scroll position x and y:
pageXOffset
pageYOffset


//CODE AND COFFEE ADDITION 23-Jan-2018

PROBLEM:
When a program repeatidly reads DOM Layout information, and changing the DOM,
will run very slowly, because it forces a lot of layouts to happen,
and laying out a document is computationally intensive.

When a program asks for the position or size of something by reading properties,
such as offsetHeight and getBoundingClientRect,
this requires the browser to compute a layout each time.

EXAMPLE OF JS PROGRAM THAT MAKES LOTS OF DOM LAYOUT REQUESTS AND SO RUNS SLOWLY:

It is 3 programs with different ways tot build up a line of X characters that is 2,000 pixels wide.
and measures the time each one takes.
a seperate file tries more variations.
Conclusion is that doing a first action of adding an X (appending),
then making 1 measurement of "offsetWidth" to calculate how many more "X"s are needed,
is much faster than calculating "offsetWidth" each time until you reach 2,000 px wide.

You can increase the final accuracy by adding something like 5 "X"s in that first step,
and then devide that elements new width by 5. You get a more accurate width of "X",
and a final width that is closer to 2,000.


    <p><span id="one"></span></p>
    <p><span id="two"></span></p>

    <script>
        // this just measures the time a function takes
        function time(name, action) {
          var start = Date.now();  // Current time in milliseconds
          action();
          console.log(name, "function took", Date.now() - start, "ms");
        }


        // this is the slow function
        // it adds 1 X at a time and calculates "offsetWidth" each time.
        time("naive", function() {
          var target = document.getElementById("one");
          // Keep adding an "X" until the offsetWidth = 2000px
          // this involves recalculating the offsetWidth EACH TIME!
          while (target.offsetWidth < 2000) {
            target.appendChild(document.createTextNode("X"));
          }
          console.log('"naive" is ' + target.offsetWidth + ' px wide');
        });
        // naive function took 250 ms


        // this is the faster function.
        // it only measures offsetWidth ONCE.
        time("clever", function() {
          var target = document.getElementById("two");
          // first add 1 set of 5 "XXXXX".
          target.appendChild(document.createTextNode("XXXXX"));
          // now measure the target's width/5 (width of one X)
          // then calculate "Total" which is how many "X" fit in 2000px
          var total = Math.ceil(2000 / (target.offsetWidth / 5));
          // not add "total" number of more "X"s to it.
          for (var i = 5; i < total; i++) {
            target.appendChild(document.createTextNode("X"));
          }
          console.log('"clever" is ' + target.offsetWidth + ' px wide');
        });
        // clever function took 1ms


        // this is my version of the faster function "clever".
        // to see what happens when you only add one "X" first, instead of 5 "X"s
        time("myVersion", function() {
          var target = document.getElementById("three");
          // first add first "X". (just 1)
          target.appendChild(document.createTextNode("X"));
          // now measure the target's width (width of one X)
          // then calculate "Total" which is how many "X" fit in 2000px
          var total = Math.ceil(2000 / target.offsetWidth);
          // not add "total" number of more "X"s to it.
          for (var i = 1; i < total; i++) {
            target.appendChild(document.createTextNode("X"));
          }
          console.log('"myVersion" is ' + target.offsetWidth + ' px wide');
        });
        // myVersion function took 2ms
      </script>



STYLING:

Some styling of text is built into certain element types.
Examples:
  <strong> makes text bold,
  <a> makes text blue and underlined (plus adds click to go there functionality)

Things like text color or underlining can be changed by us with JS using the "style" property.

    <p><a href=".">Normal link</a></p>
    <p><a href="." style="color: green">Green link</a></p>

The "style" property can have one or more "declerations"
"decleration" ex:  "color: green".
2 "decleration"s ex:  "color: green; border: solid".  ( semicolon ";" between each decleration)


    This text is displayed <strong>inline as normal</strong>,
    more text to show more normal inline text (does not skip a line to take up its own line),
    <strong style="display: block">as a block, which skips to next line to take up its own line</strong>, and
    <strong style="display: none">will not show up at all</strong>.


Using "display: none" is often a useway way to temporarily hide elements.

To use JS to manipulate these characteristics requires:
targeting a node, such as by their Id or TagName,
then using the ".style" property.  Ex:

    <p id="paragraph" style="color: purple">Pretty text</p>
    <div id="myDiv">
      <p>P tag inside a div</p>
      <p>Another P tag inside the same div</p>
    </div>

    <script>
        var paragraph = document.getElementById("paragraph");
        console.log(paragraph.style.color);
        paragraph.style.color = "red";

        // modify all the <p> tags inside a div.
        // seems to require that div have an Id
        // then going through each tag inside that div
        // cant seem to just measure how many there are (no length property?)
        // so just go until one returns as "undefined"
        var theDiv = document.getElementById("myDiv");
        var i = 0;
        while (theDiv.getElementsByTagName("P")[i] != undefined) {
          theDiv.getElementsByTagName("P")[i].style.backgroundColor = "red";
          i++;
        }
    </script>

NOTE: getting all elements inside a DIV is... awkward, thus must be a better way?
At least I got the above to work.

SPECIAL NOTE:  some style properties have dashes "-"  like "font-family".
In JS those are re-written with their dashes removed and second word capitalised.
Ex: style.fontFamily.
Or style["font-family"]  works too?

//END OF CODE AND COFFEE ADDITION 23-Jan-2018
