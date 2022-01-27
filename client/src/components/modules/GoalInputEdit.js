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
    },
    })
};

const GoalInputEdit = (props) => {
    const[value, setValue] = useState("");
    const[tags, setTags] = useState([]);
    const[frequency, setFrequency] = useState(0);
    const[minimum, setMinimum] = useState(0);

    useEffect(() => {
        get("/api/goals", { creatorId: props.userId }).then((goals) => {
            console.log(props.goalId, goals, goals.length)

        if (goals.length >= props.goalId) {
            get("/api/goalId", { creatorId: props.userId, goalId: props.goalId }).then((goal) => {
            const currentGoal = []
            for (var i=0; i < goal[0].goalTags.length; i++) {
                currentGoal.push({value: goal[0].goalTags[i], label: goal[0].goalTags[i]})
            }
            setValue(goal[0].goalContent)
            setTags(currentGoal)
            setFrequency({value: goal[0].frequency.toString(), label: goal[0].frequency.toString()})
            setMinimum({value: goal[0].minimum.toString(), label: goal[0].minimum.toString()})
            }

            
        )}

        let types = tagValues(tags);
        const icon_type = ['hand','lungs','heart','brain','misc','eyes','legs','biceps','core'];
        for (let i = 0; i<types.length; i++){
            const NewIcon= {
            creatorId: props.userId,
            type: icon_type.indexOf(types[i]),
            state:-1,
        }  
            console.log("icon", NewIcon);
            post(`/api/icons`, NewIcon);
        }

        });
    }, []);

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

    const addGoal = () => {
        const NewGoal = { 
            creatorId: props.userId, 
            goalId: props.goalId,
            content: value, 
            tags: tagValues(tags), 
            frequency: frequency.value, 
            minimum: minimum.value,
        };
        console.log("updating")
        post("/api/editGoal", NewGoal).then(() => {
            window.location.reload()
        }) 
        let types = tagValues(tags);
        const icon_type = ['hand','lungs','heart','brain','misc','eyes','legs','biceps','core'];
        for (let i = 0; i<types.length; i++){
            const NewIcon= {
            creatorId: props.userId,
            type: icon_type.indexOf(types[i]),
            state:-1,
        }  
            console.log(NewIcon);
            post(`/api/icons`, NewIcon);
        }
    
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
                value={value}
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
            update
            </button>
            </div>
            </p>
        </div>
    );

};



export default GoalInputEdit;