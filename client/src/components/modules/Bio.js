import { get, post } from "../../utilities"
import React, { useState, useEffect } from "react";

const Bio = (props) => {
    const [bio, setBio] = useState();

    useEffect(() => {
    document.title = "Profile Page";
    get("/api/user", { userId: props.userId }).then((userObj) => {
        setBio(userObj.bio);
    })
    }, [])

    const handleSave = (event) => {
        event.preventDefault();
        post("/api/bio", {value: bio});
    }; 

    const handleChange = (event) => {
        setBio(event.target.value);
    };

    return (
    <>
        <textarea
            type="text"
            className="TextBox"
            style = {{resize:"none", height:150, fontSize:15}}
            placeholder="Bio"
            value={bio}
            onChange={handleChange}
        /> 
        <button type="button" className="saveButton" onClick={handleSave} >save </button>
    </>
    );
};

export default Bio;