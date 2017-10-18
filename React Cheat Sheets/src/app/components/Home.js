//this file should probably be called Home.js

import React from "react";

export class Home extends React.Component {
  render() {

    //can access the props that are passed to this component like this: (see notes in index.js)
    console.log(this.props);

    //more complex code to go into the "return ("
    var text = "Something";

    let content = "";
    if (true) {
      content =<p>Hello!</p>
    }

    return (
      <div>
        <p>In a new Component!</p>
        { 2 + 2 }
        { "This string also works" }
        <p>{text}</p>
        { content }
        { 5 == 2 ? "Yes" : "Terneries also work as one line code" }

        <p>Your name is {this.props.name}</p>

        <div>
          <h4>Hobbies (looping example)</h4>
          <ul>
            {this.props.user.hobbies.map((hobby) => <li>{hobby}</li>)}
          </ul>
        </div>

        <hr/>
        {this.props.children}

      </div>
    );
  }
}

// key detail is the {}  to pass data into the component from either
//1) above its "return (" call
//or 2) from external props that are passed to it

// Valid javascript code can be placed within { } as the { 2 + 2 } in the example above
//NOTE: Must be all in one line only
//to add more complex content of >1 line,  create it above the "return (" as a variable,
//then call that variable between {}  in the return

//NOTE: in the looping example: {this.props.user.hobbies.map((hobby) => <li>{hobby}</li>)}
//"hobby" is word chosen at random just for that function
//CAUTION: calling < Home /> multiple times but not all of them have the same props passed may cause issues

// {this.props.user.hobbies.map((hobby) => <li>{hobby}</li>)}
//to avoid a different warning, each item produced, in this case a <li> item, should be given a unique key:
//{this.props.user.hobbies.map((hobby, i) => <li key={i}>{hobby}</li>)}

//to pass more <div>s or <p>s or <h1>s between the < Home/ >  need  {this.props.children}
//see also index.js,  < Home/>  becomes split into  < Home > < /Home >


//this is just a good practice apparently
//PROP Types:  tell react the type of each property you are expecting:
Home.propTypes = {
  name: PropTypes.string,
  age: PropTypes.number,
  user: PropTypes.object,
  children: PropTypes.element.isRequired
};
/*NOTE:  For those using latest React version: use prop-types instead of React.PropTypes.#dataType#

1) npm install --save-dev prop-types
2) In Home.js:
import PropTypes from 'prop-types'

3)
Home.propTypes = {
    name: PropTypes.string,
    age: PropTypes.number,
    user: PropTypes.object
}﻿
*/
