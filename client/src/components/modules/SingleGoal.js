//import { post } from "jquery";
import React, { useState } from "react";
import { get, post } from "../../utilities";
import "./GoalList.css";

/**
 * Component to render a single goal
 * @param {string} content of the goal
 */

const SingleGoal = (props) => {
    const update = (checked) => {
        if (checked) {
            props.goal.achievement++;
        } else {
            props.goal.achievement--;
        }

        const newAchievement = {
            creatorId: props.goal.creatorId,
            goalId: props.goal.goalId,
            achievement: props.goal.achievement
        }
        post("/api/updateachievement", newAchievement)
    }

    const checkboxes = [];
    for (var i=0; i < props.goal.frequency; i++) {
        var checked = false;
        if (i < props.goal.achievement) {
            checked = true;
        }
        const [isChecked, setIsChecked] = useState(checked);  
        
        const handleOnChange = () => {
            setIsChecked(!isChecked);
            update(!isChecked);   
        }

       checkboxes.push( <input key={i} checked={isChecked} type="checkbox" onChange={handleOnChange}/>)
    
    }

    return (
        <div className="Goal-container">
            <div className="flex-container">
                {props.goal.goalContent}
                <div>  </div>
                {checkboxes}     
            </div>
        </div>

    )
}

export default SingleGoal;