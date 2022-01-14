import React, { Component } from "react";
import { Link } from "@reach/router";
import icon from '../../public/icon_illustration.png'
import "./Icon.css";
// This identifies your web application to Google's authentication service
const GOOGLE_CLIENT_ID = "732721046468-lqep618inia61e4p3nlvn1jft5c58fp4.apps.googleusercontent.com";


class Icon extends Component {
    constructor(props) {
        super(props);
        this.state = {
          icon_id:0,
            progress:0,
        };
      }

  render() {
    return (
        <div className="Icon-container">
            <img src={icon} alt="icon.jpg"/>
            </div>
     
    );
  }
}

export default Icon;