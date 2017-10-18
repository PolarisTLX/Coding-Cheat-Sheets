//THIS IS JUST AN EXAMPLE TO DEMONSTRATE INTERACTIVE BUTTON IMPLEMENTATION

import React from "react";
import { render } from "react-dom";

//now import seperate components:
import { Header } from "./components/Header";
import { Home } from "./components/Home";

class App extends React.Component {

  render() {

    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-10 col-xs-offset-1">
            < Header/ >
          </div>
        </div>
        <p>additional text</p>
        <div className="row">
          <div className="col-xs-10 col-xs-offset-1">
            <h1>Hello World!</h1>

            < Home name={"Max"} initialAge={27} />

          </div>
        </div>
      </div>
    );
  }
}

//render(what you want to render, where you want to render it in the HTML (index.HTML)
//NOTE: can only return ONE element. In this case the <div></div>
//(nested elements, like the <h1></h1> inside it do not count)
//could not have two <div>s beside each other / sibling elements
render(<App/>, window.document.getElementById("app"));


//to pass more <div>s or <p>s or <h1>s between the < Home/ >  need  {this.props.children}
//see also index.js,  < Home/>  becomes split into  < Home > < /Home >
