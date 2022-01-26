import React, { Component, useState, useEffect } from "react";
import { Router } from "@reach/router";
import NotFound from "./pages/NotFound.js";
import Skeleton from "./pages/Skeleton.js";
import Profile from "./pages/Profile.js";
import Feed from "./pages/Feed.js";

import SideBar from "./modules/SideBar.js";
import "../utilities.css";

import "./App.css";
import { socket } from "../client-socket.js";

import { get, post } from "../utilities";

import 'foundation-sites/dist/css/foundation.min.css';


/**
 * Define the "App" component
 
 */

 class App extends Component {
  // makes props available in this component
  constructor(props) {
    super(props);
    this.state = {
      userId:undefined,
    };
  }

  componentDidMount() {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        this.setState({ userId: user._id });
      }
    });
  }
  handleLogin = (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      this.setState({userId: user._id});
      post("/api/initsocket", { socketid: socket.id });
    });
  };

   handleLogout = () => {
    this.setState({userId: undefined});
    post("/api/logout").then(() => {window.location.href = "/progress";});

  };
  
  render() {

    return (
  
      <>
      <div className="App-container u-flex">
        <div className="b1 u-flexColumn">
          <SideBar handleLogin={this.handleLogin}
                handleLogout={this.handleLogout}
                userId={this.state.userId} />
        </div>
        <div className="u-flexColumn">
          <Router>
            <Skeleton path="/dashboard/:userId" userId={this.state.userId}/>
            <Profile path="/profile/:userId" myUserId={this.state.userId} />
            <Feed path ="/friends/:userId" userId={this.state.userId}/>
            <NotFound default />
          </Router>
        </div>
       </div>
      </>
    );
    }
   
 }

export default App;



