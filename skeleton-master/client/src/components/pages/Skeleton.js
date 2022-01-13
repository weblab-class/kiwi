import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import icon from '../../public/weblab_doodles.jpg'
import "../../utilities.css";
import "./Skeleton.css";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "732721046468-lqep618inia61e4p3nlvn1jft5c58fp4.apps.googleusercontent.com";

const Skeleton = () => {
  return (
    <> <div className="main">
  
      <h1> <img src={icon}  alt="icon.jpg"/>
      </h1>
      </div>
    </>
  );
};

export default Skeleton;
