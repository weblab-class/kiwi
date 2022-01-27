import React, { useState, useEffect } from "react";
import {get} from "../../../utilities"
import Card from "./Card.js";
import NewStoryModal from "./NewStoryModal.js";
import Filter from "./Filter.js";
import FriendsChat from "../../modules/FriendsChat.js";
import "../../../utilities.css";

/**
 * Feed is a component of the firends page.
 *
 * Proptypes
 * @param {string} userId of the story
 */

const Feed = (props) => {
  const [stories, setStories] = useState([]);
  const [filters, setFilters] = useState([]);
  const [allStories, setAllStories] = useState([]);
  console.log("userID", props.userId);


  useEffect(() => {
    document.title = "Story Feed"; 
    get("/api/stories").then((storyObjs) => {
      let reversedStoryObjs = storyObjs.reverse();
      setStories(reversedStoryObjs);
      setAllStories(reversedStoryObjs);
    });
  }, []);

  const addNewStory = (storyObj) => {
    setStories([storyObj].concat(stories));
  };


  const handleChange = (filters) => {
    setFilters(filters);
    const selectedFilters = filters.map(item => item["value"]);
    const filteredStories = allStories.filter((story) => {
      return story.storyTags.map(item => item.value).some(item => selectedFilters.includes(item));
    })
    setStories(filteredStories);
  }


  let storiesList = null;
  const hasStories = stories.length !== 0;
  if (hasStories) {
    storiesList = stories.map((storyObj) => (
      <Card
        key={`Card_${storyObj._id}`}
        _id={storyObj._id}
        creator_name={storyObj.creatorName}
        creator_id={storyObj.creatorId}
        creator_image = {storyObj.creatorImage}
        userId={props.userId}
        storyTitle ={storyObj.storyTitle}
        storyImage = {storyObj.storyImage}
        storyContent = {storyObj.storyContent}
        storyLocation = {storyObj.storyLocation}
        storyTags = {storyObj.storyTags}
      />
    )
    );
  } else {
    // storiesList = <div>No stories!</div>;
  }
  return (
    <> 
      <div style = {{width: '30%'}}>
        <Filter handleChange = {handleChange} value = {filters}/>
      </div>
      {props.userId && <NewStoryModal addNewStory={addNewStory} />}
      <div className="Social">
      <div className = "StoriesList">
        {storiesList}
      </div>
      <FriendsChat userId = {props.userId} />
      </div>
    </>
  );
};


export default Feed;
