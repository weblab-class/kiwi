import React, { Component } from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import logo from "../../public/logo.png";
import "./SideBar.css";

// This identifies your web application to Google's authentication service
const GOOGLE_CLIENT_ID = "732721046468-l63b9oggi7jnpl2ve6m39s87rk80en9s.apps.googleusercontent.com";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
class SideBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (

      <nav className="SideBar-container"> // Add pages here for dashboard
           <img src={logo} alt="logo.png"/>

        <div className="SideBar-linkContainer u-inlineBlock">
          <Link to="/dashboard" className="SideBar-link">
            dashboard
          </Link>
          {this.props.userId && (
            <Link to={`/profile/${this.props.userId}`} className="SideBar-link">
              profile
            </Link>
          )}
          <Link to="/progress/" className="SideBar-link">
            progress
          </Link>
          <Link to="/friends/" className="SideBar-link">
            friends
          </Link>
          {this.props.userId ? (
            <GoogleLogout
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Logout"
              onLogoutSuccess={this.props.handleLogout}
              onFailure={(err) => console.log(err)}
              className="SideBar-link SideBar-login"
            />
          ) : (
            <GoogleLogin
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Login"
              onSuccess={this.props.handleLogin}
              onFailure={(err) => console.log(err)}
              className="SideBar-link SideBar-login"
            />
          )}
        </div>
        
      </nav>
    );
  }
}

export default SideBar;