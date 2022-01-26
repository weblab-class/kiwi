import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities"
import Interests from "../modules/Interests.js";
import ImageFile from "../modules/uploadPic.js";
import ButtonModal from "../modules/ButtonModal.js";
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
  const [following, setFollowing] = useState([]);
  const [myFollowers, setMyFollowers] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [myFriends, setMyFriends] = useState([]);
  const [yourFriends, setYourFriends] = useState([]);
  const [titles, setTitles] = useState([]);


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
        setFollowers(userObj.followers);
        setYourFriends(userObj.friends);
        get("/api/user", { userId: props.myUserId }).then((myUserObj) => {
          setMyUser(myUserObj);
          console.log("MYSUERMYSUER", myUserObj)
          setFollowing(myUserObj.following);
          setMyFollowers(myUserObj.followers);
          setMyFriends(myUserObj.friends);
          console.log("following", myUserObj.following);
          console.log("user._id", props.userId);
          if (myUserObj.following.map((f)=>(f._id)).includes(""+props.userId)){
            setStatus("following")
          } else{
            setStatus("follow")
          }
        })   
    }) 
    

    get("/api/myStories", { creatorId: props.userId }).then((stories) => {
      setTitles(stories.map(item => item['storyTitle']))
    })
  }

  }, [props.myUserId]);

  if (!user) {
    return (<div> Loading! </div>);
  }

  const onChange = (value) => {
    setInterests(value);
    post("/api/interests", {value: value})
  };

  const changeStatus = () => {
    if (status === "follow"){
      setStatus("following");
      const newObj = {"name": user.name, "_id": props.userId}
      const tempFollowing = following.concat([newObj])
      setFollowing(tempFollowing)
      const newFollowing = {
        myUserId: props.myUserId,
        following: tempFollowing,
      }
      post("/api/following", newFollowing)
      console.log("FOLLOWING", newFollowing)

      // console.log("NEWFOLLOWERS USER", myUser)
      // console.log("NEWFOLLOWERS followers", followers)
      console.log("myuser", myUser)
      const newObjMe = {"name": myUser.name, "_id": props.myUserId}
      const tempFollowers = followers.concat([newObjMe])
      setFollowers(tempFollowers)
      // console.log("NEWFOLLOWERS", followers)
        const newFollowers = {
          userId: props.userId,
          followers: tempFollowers,
        }

      post("/api/followers", newFollowers).then(() => {
        if (myFollowers.map((f)=>(f._id)).includes(""+props.userId) && tempFollowing.map((f) => (f._id)).includes(""+props.userId)){
          console.log("friends")
          const tempMyFriends = myFriends.concat([{"name": user.name, "_id": props.userId}]);
          const tempYourFriends = yourFriends.concat([{"name": myUser.name, "_id": props.myUserId}])
          const myNewFriends = {
            userId: props.myUserId,
            friends: tempMyFriends,
          }
          post("/api/friends", myNewFriends)
  
          const yourNewFriends = {
            userId: props.userId,
            friends: tempYourFriends,
          }
          post("/api/friends", yourNewFriends)
        }
      })

      console.log("FOLLOWERS", myFollowers)
      console.log("mapping2", myFollowers.map((f)=>(f._id)))
      console.log("FOLLOWING", tempFollowing)
      console.log("mapping", tempFollowing.map((f)=>(f._id)))
    
      console.log("" + props.userId)
      if (myFollowers.map((f)=>(f._id)).includes(""+props.userId) && tempFollowing.map((f) => (f._id)).includes(""+props.userId)){
        console.log("friends")
        const tempMyFriends = myFriends.concat([{"name": user.name, "_id": props.userId}]);
        const tempYourFriends = yourFriends.concat([{"name": myUser.name, "_id": props.myUserId}])
        const myNewFriends = {
          userId: props.myUserId,
          friends: tempMyFriends,
        }
        post("/api/friends", myNewFriends)

        const yourNewFriends = {
          userId: props.userId,
          friends: tempYourFriends,
        }
        post("/api/friends", yourNewFriends)

      }

    } else{
      console.log("FOLLOWING DELETE", following)
      setStatus("follow")
      console.log("After setstatus", following)
      const tempFollowing = following.filter((followingPerson) => {return followingPerson._id !== user._id})
      setFollowing(tempFollowing)
        const newFollowing = {
          myUserId: props.myUserId,
          following: tempFollowing,
        }
      post("/api/following", newFollowing)

      console.log("FOLLOWING DELETE", followers)
      const tempFollowers = followers.filter((follower) => {return follower._id !== myUser._id})
      setFollowers(tempFollowers)
      const newFollowers = {
          userId: props.userId,
          followers: tempFollowers,
        }
      post("/api/followers", newFollowers)
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
            <div> {titles} </div>
          </div>
        </div> 
      </div>
    </>
  );
};

export default Profile;