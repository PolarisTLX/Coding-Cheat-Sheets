//THIS IS JUST AN EXAMPLE TO DEMONSTRATE INTERACTIVE BUTTON IMPLEMENTATION

import React from "react";
//need this line below for newer version of react to work in this tutorial
import PropTypes from 'prop-types'

export class Home extends React.Component {

  //this is ES6 stuff, Lecture 7
  //props  and  props.age  come from outside  in index.js call to this component: < Home name={"Max"} age={27} />
  constructor(props) {
    super();
    //setting the props.age (that was given in the index.js file) to a new variable:
    this.state = {
      age: props.initialAge,
      status: 0
    };
  }

  onMakeOlder() {
    //setState is IMPORTANT FOR INTERACTIVITY
    //this causes React to re-render
    this.setState({
      age: this.state.age + 3
    });
  }

  render() {
    return (
      <div>

        <p>Your name is {this.props.name}, age is {this.state.age}</p>
        <p>To show that the aspect called "status" doesn&#8217;t change: Status = {this.state.status}</p>
        <hr/>

        <button onClick={() => this.onMakeOlder()} className="btn btn-primary">Make me older</button>
      </div>
    );
  }
}


// key detail is the {}  to pass data into the component from either
//1) above its "return (" call
//or 2) from external props that are passed to it

// Valid javascript code can be placed within { } as the { 2 + 2 } in the example above
//NOTE: Must be all in one line only

//NOTE: in the looping example: {this.props.user.hobbies.map((hobby) => <li>{hobby}</li>)}
//"hobby" is word chosen at random just for that function
//CAUTION: calling < Home /> multiple times but not all of them have the same props passed may cause issues

// {this.props.user.hobbies.map((hobby) => <li>{hobby}</li>)}
//to avoid a different warning, each item produced, in this case a <li> item, should be given a unique key:
//{this.props.user.hobbies.map((hobby, i) => <li key={i}>{hobby}</li>)}

//to pass more <div>s or <p>s or <h1>s between the < Home/ >  need  {this.props.children}
//see also index.js,  < Home/>  becomes split into  < Home > < /Home >


//this is just a good practice apparently, to prevent accidental re-asigning a variable to a different type
//PROP Types:  tell react the type of each property you are expecting:
Home.propTypes = {
  name: PropTypes.string,
  initialAge: PropTypes.number
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
