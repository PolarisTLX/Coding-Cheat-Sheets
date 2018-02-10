Chapter 14 of Eloquent JavaScript: Handling Events


The addEventListener("event", function(){})  functin registers its second argument (usually a functin),
to be called when the event in the first argument occurs.
It is called as a method on the whole browser window.

    <p>Click this document to activate the handler.</p>

    <script>
        addEventListener("click", function() {
          console.log("You clicked!");
        });
    </script>


Every DOM element has its own addEventListener method to listen specifically on that element.

This example checks only for click events on the button and not on anything else on the page.

    <button>Click me</button>
    <p>Clicking here will do nothing.</p>

    <script>
      var button = document.querySelector("button");
      button.addEventListener("click", function() {
        console.log("Button clicked.");
      });
    </script>


!!!!
SWITCH TO 3RD EDITION OF THE BOOK AS OF THIS POINT.
!!!!

The "onclick" attribute, which is placed right in the target element itself in the HTML code also works.
// SPECIAL NOTE: onclick is all lower case, though it does not matter
Example:

    <button onclick="myClickFunction()">Or Click Me</button>
    <p>Clicking here will do nothing.</p>

    <script>
      function myClickFunction() {
        console.log("2nd Button clicked that has with 'onclick' attribute in the HTML.");
      }
    </script>

Problem with this is you can only register one event handler per node/element with the "onclick" attribute method.

Other events through attributes:
https://www.w3schools.com/tags/ref_eventattributes.asp

"onclick"
"ondblclick"
"onmousedown"
"onmousemove"
"onfocus"
"onkeyup"
"oncopy"
"onpaste"
.
.



.removeEventListener() removes a handler:
 below demonstrates that "Done." will only print to console once,
then the EventListener will be removed.

<button>Act-once button</button>
<script>
  let button = document.querySelector("button");
  function once() {
    console.log("Done.");
    button.removeEventListener("click", once);
  }
  button.addEventListener("click", once);
</script>

You will want to make the functin a named functin, (as opposed to being annoymous),
because the functin given to removeEventListener has to be the exact same
that was given to addEventListener.
Because you want to pass the exact same value to both.


EVENT OBJECTS
all event handlers are passed an argument which is the EVENT OBJECT.
This object holds additional information about the event.
Information such as: which mouse button was pressed?
By looking a the event objects .button property we can tell:

<button>Click me</button>
<script>
  let button = document.querySelector("button");
  button.addEventListener("mousedown", event => {
    if (event.button == 0) {
      console.log("Left button");
    // } else if (event.which == 1) {
    } else if (event.button == 2) {
      console.log("Middle button");
    // } else if (event.which == 2) {
    } else if (event.button == 1) {
      console.log("Right button");
    }
  });
</script>

EVENT.WHICH VS EVENT.BUTTON:
They seem to do the same thing, but event.button seems to be recommended more for mouse
"The event.which property returns which keyboard key or mouse button was pressed for the event."
"The event.button property returns a number that indicates which mouse button was pressed when a mouse event was triggered. This property is mostly used together with the onmousedown event."

I find event.button to be more intuitive.
Apparently later we find that for keyboard presses its best to use event.key

The event objects ".type" property holds a string of the kind of event
Ex: "click", "mousedown" etc.
The information stored in the event object is different depending on the type of event.


PROPOGATION - EVENT PROPOGATION
Basically a click on a button that is within a paragraph,
event handlers on that paragraph will also receive the click event.

If both the button and the paragraph have a handler,
the more specific one (in this case on the button), goes first.
This event propogates all the way back to the whole window object,
in order, get a chance to respond to the event.

the method .stopPropagation() can be called on any event handler
to stop any handlers further back from receiving the event.

Useful when a clickable button is inside another clickable button or background.

This example shows two scenarios:
There is a button in a paragraph.
1. When a click of the right mouse button occurs on the button,
that handler also calls .stopPropagation() and thus something happens ONLY to the button.
2. Any other kind of click, causes seomthing to happen to both the button and the paragraph.

  <p>A paragraph with a <button>Button</button>.</p>
  <script>
    let paragraph = document.querySelector("p");
    let button = document.querySelector("button");

    paragraph.addEventListener("mousedown", () => {
      console.log("Handler for paragraph");
    });
    button.addEventListener("mousedown", () => {
      console.log("Handler for button");
      if (event.button == 2) { event.stopPropagation(); }
    });
  </script>


  CONTINUE FROM COFFEE & CODE

  Most event objects also have a .target property.
  It refers to the node where they originated.
  You can use this to protect against handling an event that propogated up from a node you did not intend.

  You can also use the .target property to use a wide net to catch an event where there are many child nodes within 1 parent node.

  AWESOME EXAMPLE!!!!
  Example: a parent node contains many buttons as child nodes,
  and its simpler to just place a click handler on the parent node,
  and use the .target property to figure out if any of the child buttons were clicked,
  as opposed to placing a handler on each of the child button nodes.

  <!-- AWESOME EXAMPLE: this is a event handler applied to parent node to avoid applying to all child nodes -->

  <!--
      <button>A</button>
      <button>B</button>
      <button>C</button>

      <script>
        document.body.addEventListener("click", event => {
          if (event.target.nodeName == "BUTTON") {
            console.log("Clicked", event.target.textContent);
          }
        });
      </script> -->

   <!-- BETTER EXAMPLE -->
  <!-- To target ONLY buttons that are wrapped into a <p>: -->
  <!-- NOW IT WORKS! (but must use with an id attribute and .getElementById ) :)  -->
  <!-- UPDATE: Also got it working as below for buttons within a <p> without needing an id attribute -->
    <p>
   <!-- <p id="attempt"> -->
      <button>A</button>
      <button>B</button>
      <button>C</button>
    </p>
    <button>NOT INSIDE A PARAGRAPH</buton>
    <script>
        // document.p.addEventListener("click", event => {  // DOES NOT WORK
        // var children = document.body.getElementsByTagName("p");  // DOES NOT WORK

    // var paragraphs = document.getElementById("attempt");  // WORKS!
    var paragraphs = document.getElementsByTagName("p");  // DOES NOT WORK
      //console.log(paragraphs);
      //console.log(paragraphs[0]);
      // paragraphs.addEventListener("click", event => {  // DOES NOT WORK. Need to add [0]
      paragraphs[0].addEventListener("click", event => {
        if (event.target.nodeName == "BUTTON") {
          console.log("Clicked", event.target.textContent);
        }
      });
    </script>


  REVIEW:  document.body holds all of the nodes.
  document.p  does not work.

  // DONE AT COFFEE & CODE



DEFAULT ACTIONS
Most events have default actions: click link takes you to that page,
Press down arrow, the webpage scrolls down etc.

JavaScript event handlers that you apply will occur BEFORE the default behavior.
(though not all types of events)
If you want then prevent the default from happening,
use .preventDefault()  method on the event.

Example: A link that wont go anywhere:

    <a href="https://developer.mozilla.org/">Link wont go anywhere</a>

    <script>
    let link = document.querySelector("a");
    link.addEventListener("click", event => {
      console.log("Nope.");
      event.prevent();
    });
    </script>


Example: To prevent a button from have the right click on it,
requires the "contextmenu" event type:

    <button>Normal Button</button>
    <button id="noRightClick">Right Click no menu pops us button</button>

    <script>
        let rClick = document.getElementById("noRightClick");

        // DOES NOT WORK for PREVENTING RIGHT CLICK:
        // rClick.addEventListener("mousedown", event => {
        //   if (event.button == 2) {
        //     event.preventDefault();
        //   }
        // });

        rClick.addEventListener("contextmenu", event => {
          if (event.button == 2) {
            event.preventDefault();
          }
        });
    </script>

Some events in some browsers cannot be intercepted like this,
example in Chrome, you cannot intercept Ctrl+W to close the current tab with JS.



KEY EVENTS

Example with keydown and keyup events.

    <p>This page turns violet when you hold down the V key</p>
    <script>
    addEventListener("keydown", event => {
      if (event.key == "v") {
        document.body.style.background = "violet";
      }
    });
    addEventListener("keyup", event => {
      if (event.key == "v") {
        document.body.style.background = "";
      }
    });
    </script>


Note that a keydown event repeats if it is held down.
Have to be careful of this.

SPECIAL NOTE: If you hold Shift while pressing a key, it changes its value as you might expect:
For the event.key == "v"
v = "v",  Shift + v = "V"  3 = "3", Shift + 3 = "#".

You can see if the special keys are being held down
by looking at the properties of: shiftKey, ctrlKey, altKey, metaKey

    <p>Press Contrl-Space</p>
    <script>
        addEventListener("keydown", event => {
          // both keys need to be pressed:
          if (event.key == " " && event.ctrlKey) {
            console.log("Both keys are being pressed. Good!");
          }
        });
    </script>


WHICH ELEMENT CURRENTLY HAS THE FOCUS IS WHERE A KEY EVENT ORIGINATES
Elements like form fiels, links, buttons can be what is currently "focused" on a page.
Normal nodes cannot have focus (though apparenly can if a "tabindex" attribute is given).
When nothing is in particular focus, document.body acts as the target node of key events.

Issue/problems: it is complicated to observe what a user is typing,
this can be due to things like:
-using a virtual keyboard on android, which does not fire any key events
-special software such as IME where multiple keystrokes are used to create special characters.

The best way is to check in elements that can be typed into,
such as <input> and <textarea> elements,
these elements fire "input" events instead of "key" events whenever a user changes the content (type something),
More in Chapter 18 (HTTP and Forms).



POINTER EVENTS:

Mouse Clicks and Touchscreens produce different kinds of events.

"mousedown" and "mouseup" events happen on the DOM nodes/elements that are immediately below the mouse pointer.
a "click" event fires AFTER a "mouseup" event.
NOTE If occurs on the event the contained both the "mousedown" & "mouseup" events (the pointer did not move during clicking).
If you click on paragraph, and hold, then move (drag) to another paragraph,
the "click" event will occur on the element that contains both those paragraphs.

There is also a "dblclick" event.


MOUSE "pageX" AND "pageY" || "clientX" AND "clientY":

Coordinates / precise information on location of a click,
you can look at the properties of "pageX" and "pageY",
which are coordinates in pixels of the top-left corner of the whole document
OR
"clientX" and "clientY", for coordinates of the top-left corner of the current window (if zoomed in or scrolled).

VERY SIMPLE DRAWING PROGRAM EXAMPLE:

It creates <div> after each click into the document.body:
and adds the class "dotCSS" that we define in the <style> section.
Ex: <div class="dotCSS" style="left: 635px; top: 45px;"></div>

    <style>
      body {
        height: 200px;
        background: beige;
      }
      .dotCSS {
        height: 8px; width: 8px;
        border-radius: 4px; /* rounds corners */
        background: blue;
        position: absolute;
      }
    </style>

    <script>
      addEventListener("click", event => {
        let dot = document.createElement("div");
        dot.className = "dotCSS";
        dot.style.left = (event.pageX - 4) + "px";
        dot.style.top = (event.pageY - 4) + "px";
        document.body.appendChild(dot);
      });
    </script>


MOUSE MOTION

Everytime the mouse moves, a "mousemove" event is fired.
You be used to track the postion of the mouse,
Can be very useful for click & drag functionality.

Example that makes a visual bar become wider or narrower
by dragging the mouse to left or right.

    <p>Drag the bar to change its width:</p>
    <div style="background: orange; width: 60px; height: 20px"></div>
    <script>
        let lastX; // last observed mouse X-position
        let rect = document.querySelector("div");
        rect.addEventListener("mousedown", event => {
          if (event.button == 0) {
            lastX = event.clientX;
            addEventListener("mousemove", moved);
            event.preventDefault(); //prevent selecting/highlighting the element, which is default action
          }
        });

        function moved(event) {
          // When NO buttons are being pressed, stop changing the element:
          if (event.buttons == 0) {
            // this S MUST be used as its the property that tells us which buttons are being held down
            // this S MUST be used as its the property that tells us HOW MANY buttons are being held down
            // If mouse button 1 and 2 are being held down, then event.buttons = 3
            removeEventListener("mousemove", moved);
          } else {
            let dist = event.clientX - lastX;
            let newWidth = Math.max(10, rect.offsetWidth + dist);
            rect.style.width = newWidth + "px";
            lastX = event.clientX;
          }
        }
    </script>


SPECIAL NOTE: event.buttons  with an S  is a special property for the number of mouse buttons currently held down.
And it works in this way. If mouse button 1 and button 2 (left and right click) are held down together, event.buttons = 3 (1+2).
CAREFUL The numerical values of the mouse buttons in event.buttons are not the same as those for event.button.



TOUCH EVENTS

Touch events were added after in a non-robust way after most browsers had been designed purely for mouse cursors.
"mousedown", "mouseup" and "click" events are mimiced with touch,
but not "mousemove".
The resizable bar in the last example will not work on a touch screen.
Simple buttons will work as a basic "mousedown" event is mimiced when touched on a touchscreen.

Other events are creates specifically for touch:
"touchstart" for when a fingers starts touching a screen,
"touchmove" for when the finger moves on the screen.
"touchend" for when the finger is removed from the screen.

because of "multi-touch" screens with multiple fingers at once on the screen, unlike a single mouse cursor,
these events dont have a single set of coordinates.
Their event objects instead have a property ".touches"
it holds an array-like object of points,
each point has its own pageX, pageY, clientX, clientY

Example to show red circles for every touching finger:

    <style>
      dot { position: absolute; display: block;
            border: 2px solid red; border-radius: 50px;
            height: 100px; width: 100px; }
    </style>
    <p>Touch this page</p>
    <script>
      // to make the dot follow the fingers,
      // they must be constantly removed from their last location
      // so the "update" function below is called after every event
      function update(event) {
        for (let dot; dot = document.querySelector("dot");) {
          dot.remove();
        }
        for (let i = 0; i < event.touches.length; i++) {
        // event.touches.length is every finger on the screen
          let {pageX, pageY} = event.touches[i];
          let dot = document.createElement("dot");
          dot.style.left = (pageX - 50) + "px";
          dot.style.top = (pageY - 50) + "px";
          document.body.appendChild(dot);
        }
      }
      addEventListener("touchstart", update);
      addEventListener("touchmove", update);
      addEventListener("touchend", update);
    </script>


Usually youll want to use .preventDefault() for touch events,
to prevent browsers default behavior that often come up,
such as scrolling the page on swipe and mouse events like clicks from firing.



SCROLL EVENTS

"scroll" event is fired naturally after an element is scrolled.
This is useful for keeping track of where a user is on a page,
or trigger animations only at certain points in a page.
Can only have various ways of showing progress like highlighting points in the navbar

Example: a progress bar is drawn at top of page as a user scrolls down.

<style>
  #progress {
    border-bottom: 2px solid blue;
    width: 0;
    position: fixed;  // this prevents the object from scrolling with the page
    top: 0; left: 0;
  }
</style>

<div id="progress"></div>
<script>
  document.body.appendChild(document.createTextNode(
    "this is random content to make a long page".repeat(1000)));

  let bar = document.querySelector("#progress");
  addEventListener("scroll", () => {
    let max = document.body.scrollHeight - innerHeight;
    // innerHeight (the height of the window), is required to not scroll passed the bottom of the document
    bar.style.width = `${(pageYOffset / max) * 100}%`;
    // % is used instead of "px" so that the element is sized relative to the page width.
  });
</script>


position: fixed;  prevents the object from scrolling with the page


FOCUS EVENTS

The browser files a "focus" event on any element that gains focus,
(clicked on, like a text field)
and a "blur" event when they lose focus.

These two events DO NOT propogate up unlike most other events.
An event handler on a parent node is not notified when a child node gains or loses focus.

Example: help appears on any text field that is in focus:

<p>Name: <input type="text" data-help="Your full name"></p>
<p>Age: <input type="text" data-help="Age in years"></p>
<p id="help"></p>

<script>
let help = document.querySelector('#help');
// the last <p> tag
let fields = document.querySelectorAll("input");
// the 2 input fields

for (let field of Array.from(fields)) {
  // add the help text when clicked in focus:
  field.addEventListener("focus", event => {
    // each input field (the ".target") has their own "data-help" attribute text:
    let text = event.target.getAttribute("data-help");
    // place that content in the last <p> tag.
    help.textContent = text;
  });
  // remove the help text when click out of focus:
  field.addEventListener("blur", event => {
    help.textContent = "";
  });
}
</script>

SPECIAL NOTE: moving from or to the browser tabs or window will affect the "focus" and "blur" events



LOAD EVENTS

A "load" event is fired when a page has finished loading.
If fires on the window and the document body objects.

This can be helpful to delay content of <script> tags,
because <script> tags run immediately when encountered, even if the page has not finished loading.

Some elements, such as images and script tags that load an external file
also have a "load" event that indicates the files there reference have finished loading.

Like "focus" events, "load" events also do NOT propagate.

When a page is closed or the user navigated away,
a "beforeunload" event fires.
This event is to be able to allow a user to save any unsaved work.

You can make a prompt appear to ask the user if they are sure they want to leave the page.
this is done by returning a non-null value from the handler.
"preventDefault" cannot be used here, so that a coder cannot maliciously force a user to stay on a page.


THE EVENT LOOP

This ties into Asyncronous Programming, which is a new chapter from the 3rd edition of the book.
But this chapter was placed early in the book, so need to go back and revisit.
