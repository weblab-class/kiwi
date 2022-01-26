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
  const[following, setFollowing] = useState([]);

  console.log("CHATLIST USERID", props.userId)
  const friends = []
  useEffect(() => {
    get("/api/user", { userId: props.userId }).then((userObj) => {
        setFollowing(userObj.following);
    })
    }, [])
  
  useEffect(() => {
    if (typeof following !== 'undefined') {
      console.log("LENGTH", following.length)
      for (var i=0; i < following.length; i++) {
          get("/api/user", {userId: following[i]._id}).then((followerUser) => {
            console.log("follower user", followerUser)
            const ids = followerUser.following.map(obj => obj._id)
            console.log("ids", ids)
            console.log("userid", props.userId)
            if (ids.includes(props.userId)){
              friends.push(followerUser.following)
              console.log("friends", friends)
            }
          }
          
        )

      }
    }
  }, [])


  console.log("ACTIVEUSERS", friends, friends.length, props.activeUsers.length)

  const onlineFriends = []
  for (var i=0; i <= friends.length; i++) {
    for (var j=0; j < props.activeUsers.length; j++) {
      console.log("IN THE LOOP", props.activeUsers[j]._id, friends[i]._id)
      if (props.activeUsers[j]._id === friends[i]._id) {
        onlineFriends.push(friends[i])
        console.log("ONLINEFRIENDS", onlineFriends)
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
