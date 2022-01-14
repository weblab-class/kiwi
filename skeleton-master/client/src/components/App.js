import React, { Component, useState, useEffect } from "react";
import { Router } from "@reach/router";
import NotFound from "./pages/NotFound.js";
import Skeleton from "./pages/Skeleton.js";
import SideBar from "./modules/SideBar.js";
import "../utilities.css";

import "./App.css";
import { socket } from "../client-socket.js";

import { get, post } from "../utilities";

/**
 * Define the "App" component
 
 */

 class App extends Component {
  // makes props available in this component
  constructor(props) {
    super(props);
    this.state = {
      userId: undefined,
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
      setUserId(user._id);
      post("/api/initsocket", { socketid: socket.id });
    });
  };

   handleLogout = () => {
    setUserId(undefined);
    post("/api/logout");
  };
  render() {
  return (
    <>
    <SideBar handleLogin={this.handleLogin}
          handleLogout={this.handleLogout}
          userId={this.state.userId} />
    
      <Router>
        <Skeleton path="/dashboard" />
        <NotFound default />
      </Router>
    </>
  );
  }

 }

export default App;


/*

Code for not using App as component (should work the same)
 const App = () => {
  const [userId, setUserId] = useState(undefined);

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        setUserId(user._id);
      }
    });
  }, []);

  const handleLogin = (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      setUserId(user._id);
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  const handleLogout = () => {
    setUserId(undefined);
    post("/api/logout");
  };

  return (
    <>
    <SideBar />
    
      <Router>
        <Skeleton path="/dashboard" handleLogin={handleLogin} handleLogout={handleLogout} userId={userId} />
        <NotFound default />
      </Router>
    </>
  );
};
*/