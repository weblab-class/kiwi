import React, { Component, useState, useEffect } from "react";
import { Router } from "@reach/router";
import NotFound from "./pages/NotFound.js";
import Skeleton from "./pages/Skeleton.js";
import Profile from "./pages/Profile.js";
import NavBar from "./modules/NavBar.js";

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
<<<<<<< HEAD
      this.setState({ userId: "101702048355221581250"});
=======
      this.setState({userId: user._id});
>>>>>>> 5bd00a4ab7513696c83686dfa3137bc187af68e1
      post("/api/initsocket", { socketid: socket.id });
    });
  };

   handleLogout = () => {
<<<<<<< HEAD
    this.setState({ userId: undefined });
    post("/api/logout");
=======
    this.setState({userId: undefined});
    post("/api/logout").then(() => {window.location.href = "/dashboard";});

>>>>>>> 5bd00a4ab7513696c83686dfa3137bc187af68e1
  };
  
  render() {
    
  return (
    
    <>
    <SideBar handleLogin={this.handleLogin}
          handleLogout={this.handleLogout}
          userId={this.state.userId} />
    
      <Router>
        <Skeleton path="/dashboard" userId={this.state.userId}/>
        <Profile path="/profile/:userId" />
        <NotFound default />
      </Router>
    </>
  );
  }

 }

export default App;



