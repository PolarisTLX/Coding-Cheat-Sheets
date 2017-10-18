//STATELESS COMPONENT - These are more efficient and best to use unless you need to otherwise
import React from "react";

/*because this components has no "states" to be changed, it is a "stateless component"
and these are best if you can use them, as they are more efficient.
But need change a few things such as the "class" to "const"
Compare below:

export class Header extends React.Component {
  render() {
    return (
          .
          .
          .
    );
  }
}
*/

export const Header = (props) => {
    return (
      <nav className="navbar navbar-default">
        <div className="container">
          <div className="navbar-header">
            <ul className="nav navbar-nav">
              <li><a href="#">Home</a></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  };
