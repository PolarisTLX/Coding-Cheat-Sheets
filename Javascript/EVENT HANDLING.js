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


The "onClick" attribute, which is placed right in the target element itself in the HTML code also works.
Example:

    <button onclick="myClickFunction()">Or Click Me</button>
    <p>Clicking here will do nothing.</p>

    <script>
      function myClickFunction() {
        console.log("2nd Button clicked that has with 'onclick' attribute in the HTML.");
      }
    </script>

Problem with this is you can only register one event handler per node/element with the "onclick" attribute method.
