import React from "react";
import { render } from "react-dom";

//now import seperate components:
import { Home } from "./components/Home";

class App extends React.Component {
  render() {

    var user = {
      name: "Anna",
      hobbies: ["sports", "boardgames"]
    };

    return (
      <div>
        <h1>Hello World!</h1>

        < Home />

        < Home name={"Max"} age={27} user={user} >
          <p>example to bring in data by adding children  or from another component without setting props as above</p>
        < /Home >
        
      </div>
    );
  }
}

//render(what you want to render, where you want to render it in the HTML (index.HTML)
//NOTE: can only return ONE element. In this case the <div></div>
//(nested elements, like the <h1></h1> inside it do not count)
//could not have two <div>s beside each other / sibling elements
render(<App/>, window.document.getElementById("app"));

//PROPS:  can pass properties to a component so that is can output different things when it is called more than once
//see the < Home />  and < Home name-{}..../>  example
//the passed props must be enclosed in {}
