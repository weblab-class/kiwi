import { Link } from "@reach/router";
import hand4 from '../../../public/hand4.gif';
import bicep4 from '../../../public/bicep4.gif';
import brain4 from '../../../public/brain4.gif';
import core4 from '../../../public/core4.gif';
import eye4 from '../../../public/eye4.gif';
import leg4 from '../../../public/leg4.gif';
import lung4 from '../../../public/lung4.gif';
import plant4 from '../../../public/plant4.gif';
import heart4 from '../../../public/heart4.gif';
import React, { useState, useEffect } from "react";
import { get, post } from "../../../utilities"


//  * Story is a component that renders creator and content of a story
//  *
//  * Proptypes
//  * @param {string} _id of the story
//  * @param {string} creator_name
//  * @param {string} creator_id
//  * @param {string} title of the story
//  * @param {string} image of the story
//  * @param {string} content of the story
//  * @param {string} location of the story
//  * @param {string} location of the story


const SingleStory = (props) => {
  const tags = ['hand','lungs','heart','brain','misc','eyes','legs','biceps','core']

  const map = {
    'hand': hand4,
    'heart': heart4,
    'brain': brain4,
    'lungs': lung4,
    'legs': leg4,
    'eyes': eye4,
    'core': core4,
    'biceps': bicep4,
    'misc': plant4
  }


  const images = []
  if (typeof props.storyTags !== 'undefined') {
    const values = props.storyTags.map(object => object.label)
    tags.map((tag) => {
      if (values.includes(tag)) {
        images[tag] = map[tag]
      }else{
        images[tag] = ""
      }
    })
  }

  return (
    <div className="Card-story">

      <div className = "Card-container-grid">
        <div className = "Profile-Pic">
          <img src = {props.creator_image}></img>
        </div>

        <div className = "Card-storyUser">
          <Link to={`/profile/${props.creator_id}`} className="u-link u-bold">
            {props.creator_name}
          </Link>
        </div>

        <div className = "Card-storyTags">
              <img src={images['heart']}></img>
              <img src={images['brain']}></img>
              <img src={images['lungs']}></img>
              <img src={images['legs']}></img>
              <img src={images['eyes']}></img>
              <img src={images['core']}></img>
              <img src={images['biceps']}></img>
              <img src={images['misc']}></img>
              <img src={images['hand']}></img>
        </div>
      </div>

      <p className = "Card-storyLocation">{props.storyLocation}</p>
      <p className="Card-storyTitle">{props.storyTitle}</p>
      <p className = "Card-storyImage">
        <img src={props.storyImage}></img>
      </p>
      <p className = "Card-storyContent">{props.storyContent}</p>
    </div>
  );
};

export default SingleStory;
