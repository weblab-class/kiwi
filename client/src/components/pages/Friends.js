import React, { useEffect, useState } from "react";
import FriendsChat from "../modules/FriendsChat.js";
import Feed from "../modules/friends/Feed.js";
import "./Friends.css"

/**
 * Page component to display when at the "/chat" route
 *
 * Proptypes
 * @param {string} userId id of current logged in user
 */
const Friends = (props) => {
  
  return (
    <>
      <div className = "Friends-inline">
        <div>
          <Feed userId = {props.userId}></Feed>
        </div>

        <div>
          <FriendsChat userId = {props.userId} />
        </div>
      </div>

    </>
  );
}

export default Friends;
