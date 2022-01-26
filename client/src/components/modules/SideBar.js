import React, { Component } from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import logo from "../../public/logo.png";
import "./SideBar.css";
 
// This identifies your web application to Google's authentication service
const GOOGLE_CLIENT_ID = "732721046468-8g0qe7o8qbddbvfkkrtu59tngop3dnh7.apps.googleusercontent.com";
 
/**
* The navigation bar at the top of all pages. Takes no props.
*/
class SideBar extends Component {
 constructor(props) {
   super(props);
 }
 
 render() {
   return (
/*<div><img src={logo} alt="logo.png" /></div>*/
     <nav className="SideBar-linkContainer">
 
      <div className="u-flexColumn u-flex-alignCenter">
      
      <div>{this.props.userId && (
           <Link to={`/dashboard/${this.props.userId}`} className="SideBar-link">
             dashboard
           </Link>
         )}</div>
        
         <div><Link to={`/social/${this.props.userId}`} className="SideBar-link">
           social
         </Link></div>
         <div>{this.props.userId ? (
           <GoogleLogout
             clientId={GOOGLE_CLIENT_ID}
             buttonText="Logout"
             onLogoutSuccess={this.props.handleLogout}
             onFailure={(err) => console.log(err)}
             className="SideBar-link"
           />
         ) : (
           <GoogleLogin
             clientId={GOOGLE_CLIENT_ID}
             buttonText="Login"
             onSuccess={this.props.handleLogin}
             onFailure={(err) => console.log(err)}
             className="SideBar-link"
           />
         )}

         </div>
         <div>{this.props.userId && (
           <div onClick={() => {
             window.location.href = `/profile/${this.props.userId}` 
           }}className="SideBar-link">
             profile
           </div>
         )}</div>
          {/* <div>{this.props.userId && (
           <Link to={`/friends/${this.props.userId}`} className="SideBar-link">
             friends
           </Link>
         )}</div> */}
       </div>
      
     </nav>
   );
 }
}
 
export default SideBar;
