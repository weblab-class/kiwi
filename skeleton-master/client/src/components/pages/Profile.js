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
  const [bio, setBio] = useState();
  const [interests, setInterests] = useState([]);
  const [image, setImage] = useState("");


  useEffect(() => {
    document.title = "Profile Page";
    get("/api/user", { userId: props.userId }).then((userObj) => {
      setUser(userObj);
      setBio(userObj.bio);
      setInterests(userObj.interests);
      setImage(userObj.image);
    })
  }, []);


  if (!user) {
    return (<div> Loading! </div>);
  }

  const onChange = (value) => {
    setInterests(value);
    console.log("HI");
    post("/api/interests", {value: value})
  };


  return (
    <>
      <div className="Profile-avatarContainer">
      <ImageFile userId = {props.userId} initial_img={image}/>
      </div>

      <h1 className="Profile-name u-textCenter">{user.name}</h1>

      <div className = "Position"> 
      <div className="u-inlineBlock u-textCenter">
          <h4 className="Profile-subTitle2 u-inlineBlock">interests:</h4>
          <div className = "Dropdown u-inlineBlock">
            <Interests 
            isMulti={true} 
            value = {interests} 
            onChange={onChange}/>
          </div>
        </div>
      </div>
      
      <div className="Container">
        <div className=" u-textCenter Outer-Box">
          <h4 className="Profile-subTitle">bio</h4>
          <ButtonModal userId = {props.userId} bio = {bio}></ButtonModal>
        </div>
        
        <div className="u-textCenter Outer-Box2">
          <h4 className="Profile-subTitle">posts</h4>
          <div className="Posts">3 ways to improve your cardio</div>
          <div className="Posts">4 ways to improve your flexibility</div>
          <div className ="Posts">2 ways to get your heart pumping</div>
        </div>
      </div>
    </>
  );
};

export default Profile;
