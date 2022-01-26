import React, { useState, useEffect } from "react";
import { components } from "react-select"; 
import "../../utilities.css"; 
import { get, post } from "../../utilities"; 
import "./GoalInput.css";
import { DropDownTag, DropDownFrequency, DropDownMinimum } from "../modules/DropDown.js";
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
    border: '1.5px solid black',
    borderRadius: '15px',
    boxShadow: state.isFocused ? null : null,
    "&:hover": {
        // Overwrittes the different states of border
        borderColor: state.isFocused ? "#99D98C" : "#000000",
    width: '300px'
    },
    })
};

const GoalInput = (props) => {
    const[value, setValue] = useState("");
    const[tags, setTags] = useState([]);
    const[frequency, setFrequency] = useState(0);
    const[minimum, setMinimum] = useState(0);

    {/*}
    const addNewGoal = (goalObj) => {
        {
            setGoals(goals.concat([goalObj]));
        };
    };
*/}

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const handleChangeTag = (value) => {
        setTags(value)
    }
    
    const handleChangeFrequency = (value) => {
        setFrequency(value)
    }
    const handleChangeMinimum = (value) => {
        setMinimum(value)
    }

    const tagValues = (tags) => {
        var values = [];
        for (var i = 0; i < tags.length; i++) {
            values.push(tags[i].value)
        }
        return values
    }

    const getGoalId = async () => {
        const goals = await get("/api/goals", { creatorId: props.userId });     
        //console.log("LIST of GOALS", goals);
        return goals.length + 1;
    }
    

    const addGoal = async () => {
        console.log(props.userId)
        console.log(value)
        console.log(tags)
        console.log(frequency)
        console.log(minimum)
        const NewGoal = { 
            creatorId: props.userId, 
            goalId: await getGoalId(),
            content: value, 
            tags: tagValues(tags), 
            frequency: frequency.value, 
            minimum: minimum.value,
            achievement: 0,
        };
        console.log(NewGoal)
        post("/api/goal", NewGoal).then((goal) => {
            console.log("*****", props.addNewGoal)
            props.addNewGoal(goal);

        });
      };
      
    return (
        <div>
            <p>
            <div className="Goal-title">goal:  <s></s>
            <input
                type="text"
                className="GoalInput-container"
                placeholder=" -- write your goal --"
                onChange={handleChange}
            /> 
            </div>
            </p>

            <p>
            <div className="Tags-title">tags: <s></s>
            <div className="Tag-Select u-inlineBlock">
                <DropDownTag 
                    className="u-inlineBlock"
                    isMulti={true} 
                    styles={customStyles}
                    value = {tags} 
                    onChange={handleChangeTag}
                />
            </div>
            </div>
            </p>

            <p>
            <div className="Frequency-title"># of times per week: <s></s>
            <div className="Frequency-Select u-inlineBlock">
                <DropDownFrequency 
                    isMulti={true} 
                    styles={customStyles} 
                    value = {frequency}
                    onChange={handleChangeFrequency}
                />
            </div>
            </div>
            </p>

            <p>
            <div className="Minimum-title">minimum to maintain: <s></s>
            <div className="Minimum-Select u-inlineBlock">
                <DropDownMinimum 
                    isMulti={true} 
                    styles={customStyles} 
                    value={minimum}
                    onChange={handleChangeMinimum}
                />
            </div>
            </div>
            </p>

            <p>
            <div>
            <button
                style={{borderRadius: '15px'}}
                type="submit"
                className="Submit-button"
                value="Submit"
                onClick={addGoal}>
            save
            </button>
            </div>
            </p>
        </div>
    );

};



export default GoalInput;