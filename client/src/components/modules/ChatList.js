import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities"
import SingleUser from "./SingleUser.js";
import "./SingleUser.css";
import SingleUserOffline from "../modules/SingleUserOffline.js";

/**
 * List of users that are online to chat with and all chat
 *
 * Proptypes
 * @param {UserObject[]} users to display
 * @param {UserObject} active user in chat
 * @param {string} userId id of current logged in user
 * @param {(UserObject) => ()} setActiveUser function that takes in user, sets it to active
 */
const ChatList = (props) => {
  const[friends, setFriends] = useState([]);

  console.log("CHATLIST USERID", props.userId)
  useEffect(() => {
    get("/api/user", { userId: props.userId }).then((userObj) => {
        setFriends(userObj.friends);
    })
    }, [])

  const onlineFriends = []
  for (var i=0; i < friends.length; i++) {
    for (var j=0; j < props.activeUsers.length; j++) {
      if (props.activeUsers[j]._id === friends[i]._id) {
        onlineFriends.push(friends[i])
      }
    }
  }

  const offlineFriends = []
  if (onlineFriends.length == 0) {
    for (var i=0; i < friends.length; i++) {
      offlineFriends.push(friends[i]);
    }
  } else {
  for (var i=0; i < friends.length; i++) {
    for (var j=0; j < onlineFriends.length; j++) {
      if (friends[i]._id == onlineFriends[j]._id) {
        break;
      }
      offlineFriends.push(friends[i])
      }
    }
  }

  console.log("Offline FRIENDS", friends, onlineFriends)

  return (
    <>
      <h3 className="Friends-title" >friends</h3>
      {onlineFriends
        .map((user, i) => (
          <SingleUser
            key={i}
            activeUsers={props.activeUsers}
            onlineFriends={onlineFriends}
            setActiveUser={props.setActiveUser}
            user={user}
            active={user === props.active}
            activeChat={props.activeChat}
          />
        ))}

      {offlineFriends
        .map((user, i) => (
          <SingleUserOffline
            key={i}
            activeUsers={props.activeUsers}
            onlineFriends={offlineFriends}
            setActiveUser={props.setActiveUser}
            user={user}
            active={user === props.active}
            activeChat={props.activeChat}
          />
        ))}
    </>
  );
}

export default ChatList;
