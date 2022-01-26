import React, { useState, useEffect } from "react";
import ChatModal from "../modules/ChatModal.js";

import "./SingleUser.css";

/**
 * Component to render an online user
 *
 * Proptypes
 * @param {(UserObject) => ()} setActiveUser function that takes in user,
 *  sets it to active
 * @param {UserObject} user
 * @param {boolean} active
 */
const SingleUser = (props) => {

  return (
    <div
      className={`SingleUser-container u-pointer ${props.active ?
        "SingleUser-container--active" : ""
        }`}
      onClick={() => {
        props.setActiveUser(props.user);
      }}
    >
      <div className="ChatList-name">
      <div className="Online"></div>
      <ChatModal user={props.user.name} activeChat={props.activeChat}></ChatModal>
      </div>
    </div>
  );
}

export default SingleUser;
