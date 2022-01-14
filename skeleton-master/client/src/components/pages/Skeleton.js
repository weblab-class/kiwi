import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import icon from '../../public/icon_illustration.png'
import "../../utilities.css";
import "./Skeleton.css";
import Icon from "../modules/Icon.js";
//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "732721046468-lqep618inia61e4p3nlvn1jft5c58fp4.apps.googleusercontent.com";

class Skeleton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
    };
  }
  componentDidMount() {
    document.title = "Dashboard";
    //get(`/api/user`, { userid: this.props.userId }).then((user) => this.setState({ user: user }));
  }
  render (){
  return (
    <> 
    <div className = "row">
    <div class="column">
    <div className="Icon-allContainer"> 
    <Icon />
    <Icon />
    <Icon />
    </div>
    </div>
    <div class="column">
    <div className="Icon-allContainer"> 
    <Icon />
    <Icon />
    <Icon />
    </div>
    </div>
    <div class="column">
    <div className="Icon-allContainer"> 
    <Icon />
    <Icon />
    <Icon />
    </div>
    </div>
    </div>
    </>
  );
  }

}


export default Skeleton;
