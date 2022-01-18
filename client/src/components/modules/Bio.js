import { get, post } from "../../utilities"
import React, { useState, useEffect } from "react";
import "./Bio.css";


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
            className="textbox"
            placeholder="Bio"
            value={bio}
            onChange={handleChange}
        /> 
        <button type="button" className="btn btn-primary" onClick={handleSave} >save </button>
    </>
    );
};

export default Bio;