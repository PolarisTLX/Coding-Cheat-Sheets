<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>

    <p><a href=".">Normal link</a></p>
    <p><a href="." style="color: green; border: solid">Green link</a></p>

    <!-- This text is displayed <strong>inline as normal</strong>,
    more text to show more normal inline text (does not skip a line to take up its own line),
    <strong style="display: block">as a block, which skips to next line to take up its own line</strong>, and
    <strong style="display: none">not at all</strong>. -->


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

  </body>
</html>
