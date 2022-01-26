//import { post } from "jquery";
import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities";
import EditModal from "../modules/EditModal.js";
import "./GoalList.css";

/**
 * Component to render a single goal
 * @param {string} content of the goal
 */

const SingleGoal = (props) => {
    const [dummyState, setDummyState] = useState("")

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
    
    useEffect(() => {
        setDummyState("hi")
    }, [props.goal.frequency])

    console.log("singlegoal rendering")
    return (
        <div className="Goal-container">
            <div className="goal-container-inner">
                <div className="Goal-Edit">
                    <span className="goal-title">{props.goal.goalContent}</span>
                    <EditModal 
                        userId = {props.userId}
                        goal = {props.goal}
                        goalId = {props.goal.goalId}
                        addNewGoal={props.addNewGoal} 
                        userId={props.userId}></EditModal>
                </div>
                <div className="checkboxes-container">  
                    {checkboxes}
                </div>     
            </div>
        </div>

    )
}

export default SingleGoal;