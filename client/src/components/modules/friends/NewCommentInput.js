import React, { useState } from "react";
import "./NewCommentInput.css";
import { post } from "../../../utilities";

/**
 * New Post is a parent component for all input components
 *
 * Proptypes
 * @param {string} defaultText is the placeholder text
 * @param {string} storyId optional prop, used for comments
 * @param {({storyId, value}) => void} onSubmit: (function) triggered when this post is submitted, takes {storyId, value} as parameters
 */
const NewCommentInput = (props) => {
  const [value, setValue] = useState("");

  // called whenever the user types in the new post input box
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  // called when the user hits "Submit" for a new post
  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit && props.onSubmit(value);
    setValue("");
  };

  return (
    <div className="u-flex Comment-inline">
      <textarea
        placeholder={props.defaultText}
        value={value}
        onChange={handleChange}
        style = {{resize:"none", height:40}}
        className="NewCommentInput-input"
      />
      <button
        type="submit"
        className="NewCommentInput-button"
        value="Submit"
        onClick={handleSubmit}
      >
        submit
      </button>
    </div>
  );
};

/**
 * New Comment is a New Post component for comments
 *
 * Proptypes
 * @param {string} defaultText is the placeholder text
 * @param {string} storyId to add comment to
 */
const NewComment = (props) => {
  const addComment = (value) => {
    const body = { parent: props.storyId, content: value };
    post("/api/comment", body).then((comment) => {
      // display this comment on the screen
      props.addNewComment(comment);
    });
  };

  return <NewCommentInput defaultText="new comment" onSubmit={addComment} />;
};


export default NewComment;
