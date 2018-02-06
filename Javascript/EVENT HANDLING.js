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
