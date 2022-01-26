import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities"
import Interests from "../modules/Interests.js";
import ImageFile from "../modules/uploadPic.js";
import ButtonModal from "../modules/ButtonModal.js";
import StoryModal from "../modules/StoryModal.js";
import "../../utilities.css";
import "./Profile.css";

/**
 * Profile is a component for displaying profile of the user
 *
 * Proptypes
 * @param {string} userId of the story
 */

const Profile = (props) => {
  const [user, setUser] = useState();
  const [myUser, setMyUser] = useState();
  const [bio, setBio] = useState();
  const [interests, setInterests] = useState([]);
  const [image, setImage] = useState("");
  const [status, setStatus] = useState("follow");
  const [myFollowing, setMyFollowing] = useState([]);
  const [theirFollowing, setTheirFollowing] = useState([]);
  const [myFriends, setMyFriends] = useState([]);
  const [theirFriends, setTheirFriends] = useState([]);
  const [stories, setStories] = useState([]);


  useEffect(() => {
    if(props.myUserId){

      document.title = "Profile Page";
      console.log("userid", props.userId)
      console.log("myuserid", props.myUserId)
      get("/api/user", { userId: props.userId }).then((userObj) => {
        setUser(userObj);
        setBio(userObj.bio);
        setInterests(userObj.interests);
        setImage(userObj.image);
        setTheirFollowing(userObj.following);
        setTheirFriends(userObj.friends);

        get("/api/user", { userId: props.myUserId }).then((myUserObj) => {
          setMyUser(myUserObj);
          setMyFollowing(myUserObj.following)
          setMyFriends(myUserObj.friends);
          if (myUserObj.following.map((f)=>(f._id)).includes(""+props.userId)){
            setStatus("following")
          } else{
            setStatus("follow")
          }
        })   

        get("/api/myStories", { creatorId: props.userId }).then((stories) => {
          setStories(stories);
          console.log("STORIES", stories)
        })
    }) 

  }
  }, [props.myUserId]);

  if (!user) {
    return (<div>  </div>);
  }

  const onChange = (value) => {
    setInterests(value);
    post("/api/interests", {value: value})
  };

  const changeStatus = () => {
    if (status === "follow"){
      console.log("HERE")
      setStatus("following");
      const newObj = {"name": user.name, "_id": props.userId}
      const tempFollowing = myFollowing.concat([newObj])
      setMyFollowing(tempFollowing)
      const newFollowing = {
        userId: props.myUserId,
        following: tempFollowing,
      }
      post("/api/following", newFollowing)
      console.log("FOLLOWING", newFollowing)

      // if (theirFollowing.map((f)=>(f._id)).includes(""+props.myUserId)) {
      //   console.log("FRIENDS")
      //   console.log("their name", user.name)
      //   console.log("my name", myUser.name)
      //   console.log("id", props.myUserId)
      //   console.log("my friends", myFriends)
      //   console.log("your friends", theirFriends)
      //   const newObj2 = {"name": user.name, "_id": props.userId}
      //   const tempMyFriends = myFriends.concat([newObj2]);
      //   console.log("temp", tempMyFriends)
      //   setMyFriends(tempMyFriends)
      //   const myNewFriends = {
      //     userId: props.myUserId,
      //     friends: tempMyFriends,
      //   }
      //   console.log("MYNEWFRIENDS", myNewFriends)
      //   post("/api/friends", myNewFriends)
      // }

      //   const tempTheirFriends = theirFriends.concat([{"name": myUser.name, "_id": props.myUserId}])
      //   setTheirFriends(tempTheirFriends)
      //   const theirNewFriends = {
      //     userId: ""+props.userId,
      //     friends: tempTheirFriends,
      //   }
      //   post("/api/friends", theirNewFriends)
      // }

    } else{
      setStatus("follow")
      const tempFollowing = myFollowing.filter((followingPerson) => {return followingPerson._id !== user._id})
      setMyFollowing(tempFollowing)
        const newFollowing = {
          userId: props.myUserId,
          following: tempFollowing,
        }
      post("/api/following", newFollowing)
    }
  }


  return (
    <>
      <div className = "Container">
        <div className="Profile-avatarContainer">
          <ImageFile userId = {props.userId} initial_img={image}/>
        </div>

        <h1 className="Profile-name u-textCenter">{user.name}</h1>
        {props.userId == props.myUserId ? (
            <button
              type="submit"
              className="SubmitStory-button"
              value="Save"
              onClick = {changeStatus}
              hidden>
              {status}
          </button>
          ) : (
            <button
                type="submit"
                className="SubmitStory-button"
                value="Save"
                onClick = {changeStatus}>
            {status}
            </button>
          )}

        <div className="u-inlineBlock u-textCenter Interests">
          <h4 className="Profile-subTitle2 u-inlineBlock">interests:</h4>
          <div className = "Interests-Dropdown u-inlineBlock">
            <Interests 
            isMulti={true} 
            value = {interests} 
            onChange={onChange}/>
          </div>
        </div>
      
        <div className=" u-textCenter Outer-Box-Bio">
          <span className="Profile-subTitle">bio</span>
          <div> 
            <ButtonModal myUserId = {props.myUserId} userId = {props.userId} bio = {bio}></ButtonModal>
          </div>
        </div>
        
        <div className="u-textCenter Outer-Box-Posts">
          <h4 className="Profile-subTitle">posts</h4>
          <div className = "Posts"> 
            <div> {stories.map((story) => 
              (<StoryModal story={story}/>))}  </div>
          </div>
        </div> 
      </div>
    </>
  );
};

export default Profile;