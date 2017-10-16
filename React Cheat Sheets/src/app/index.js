import React from "react";
import { render } from "react-dom";

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello World!</h1>
      </div>
    );
  }
}

//render(what you want to render, where you want to render it in the HTML (index.HTML)
render(<App/>, window.document.getElementById("app"));
