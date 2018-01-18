This chapter in Eloquent JavaScript talks about the browser wars and compatibility.

NETWORK & THE INTERNET



THE DOM:

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

.createTextNode() : creates a piece of text string that we can insert somewhere.

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
