import React, { useState, useEffect } from "react";
import { components } from "react-select"; 
import "../../../utilities.css"; 
import { get, post } from "../../../utilities"; 
import "./NewStoryInput.css";
import { DropDownTag} from "../../modules/DropDown.js";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

const customStyles = {
    control: (base, state) => ({
    ...base,
    background: "#00000",
    // Overwrittes the different states of border
    borderColor: state.isFocused ? "black" : "black",
    // Removes weird border around container
    fontSize: 15,
    border: '2px solid black',
    borderRadius: '15px',
    boxShadow: state.isFocused ? null : null,
    "&:hover": {
        // Overwrittes the different states of border
        borderColor: state.isFocused ? "#99D98C" : "#000000",
    },
    })
};

const StoryInput = (props) => {
    const[title, setTitle] = useState("");
    const[imageURI, setImageURI] = useState("https://getstamped.co.uk/wp-content/uploads/WebsiteAssets/Placeholder.jpg");
    const[content, setContent] = useState("");
    const[location, setLocation] = useState("");
    const[tags, setTags] = useState([]);

    const handleChangeTitle = (event) => {
        setTitle(event.target.value);
    };

    const handleChangeImage = (event) => {
        if(event.target.files && event.target.files[0]){
          let reader = new FileReader();
          reader.onload = function(ev){
              setImageURI(ev.target.result);
          }
          reader.readAsDataURL(event.target.files[0]);
        }
    };

    const handleChangeContent = (event) => {
        setContent(event.target.value);
    };

    const handleChangeLocation = (event) => {
        setLocation(event.target.value);
    };
      
    const handleChangeTag = (value) => {
        setTags(value)
    }
    

    const addStory = async () => {
        console.log(props.userId)
        console.log(title)
        console.log(content)
        console.log(location)
        console.log(tags)
        console.log(imageURI)
        const NewStory = { 
            creatorId: props.userId, 
            title: title,
            image: imageURI,
            content: content, 
            location: location,
            tags: tags, 
        };
        // console.log(NewStory)
        if (NewStory.image === "https://getstamped.co.uk/wp-content/uploads/WebsiteAssets/Placeholder.jpg"){
            NewStory.image = "";
        }
        post("/api/story", NewStory).then((story) => {
            console.log("*****", props.addNewStory)
            props.addNewStory(story);

        });
      };
      
    return (
        <div>
            <p>
            <div><s></s>
            <textarea
                className="title"
                placeholder=" add title"
                style = {{resize:"none", height:50}}
                onChange={handleChangeTitle}
                required
            /> 
            </div>
            </p>


            <p>
            <div>
                <input
                    id = {4}
                    type="file"
                    onChange={handleChangeImage}
                    hidden/>
                <label
                    htmlFor={4}>
                    <img className = "NewStoryInput-Image" src={imageURI}></img>
                </label>
          </div>
          </p>

            <p>
            <div><s></s>
            <textarea
                className="text"
                placeholder=" add post"
                style = {{resize:"none", height:150}}
                onChange={handleChangeContent}
                required
            /> 
            </div>
            </p>

            <p>
            <div><s></s>
            <textarea
                className="text"
                placeholder=" add location"
                style = {{resize:"none", height:50}}
                onChange={handleChangeLocation}
                required
            /> 
            </div>
            </p>

            <p>
            <div style = {{width: '100%'}}className="Tag-Select u-inlineBlock">tags: <s></s>
                <DropDownTag 
                    className="u-inlineBlock"
                    isMulti={true} 
                    styles={customStyles}
                    value = {tags} 
                    onChange={handleChangeTag}
                />
            </div>
            </p>

            <p>
            <div>
            <button
                type="submit"
                className="SubmitStory-button"
                value="Save"
                onClick={addStory}>
            submit
            </button>
            </div>
            </p>
        </div>
    );

};

export default StoryInput;