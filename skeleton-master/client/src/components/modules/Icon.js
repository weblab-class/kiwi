import React, { Component } from "react";
import { Link } from "@reach/router";
import empty from '../../public/empty.png';
import plant from '../../public/plant.png';
import hand from '../../public/hand.gif';
import hand2 from '../../public/hand2.gif';
import hand3 from '../../public/hand3.gif';
import hand4 from '../../public/hand4.gif';

import "./Icon.css";
// This identifies your web application to Google's authentication service
const GOOGLE_CLIENT_ID = "732721046468-lqep618inia61e4p3nlvn1jft5c58fp4.apps.googleusercontent.com";


class Icon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
      }
/*TODO
  Code icon display using local vars
  Implement MongoDB using router.get()
  Commit and merge (note to ask Shreya about App.js component)
*/

  render() {
    if (this.props.progress!=0){
    return ( <div className="Icon-container"><img src={hand} alt="icon.jpg"/></div>);}
    else {
     return ( <div className="Icon-container"><img src={empty} alt="icon.jpg"/></div>);}

    

}

}

export default Icon;