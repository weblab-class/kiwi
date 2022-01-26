//import { post } from "jquery";
import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities";
import Tracker from "./Tracker.js";
import EditModal from "../modules/EditModal.js";
import "./GoalList.css";

/**
 * Component to render a single goal
 * @param {string} content of the goal
 */

const SingleGoal = (props) => {
    // // console.log("achievement", achievement)
    // const update = (checked) => {
    //     if (checked) {
    //         props.goal.achievement++;
    //     } else {
    //         props.goal.achievement--;
    //     }

    //     // const change = checked ? 1 : -1;

    //     const newAchievement = {
    //         creatorId: props.goal.creatorId,
    //         goalId: props.goal.goalId,
    //         achievement: props.goal.achievement,
    //     }
    //     post("/api/updateachievement", newAchievement)


    // const checkboxes = [];
    // for (var i=0; i < props.goal.frequency; i++) {
    //     console.log("Generating checkboxes")
    //     var checked = false;
    //     if (i < props.goal.achievement) {
    //         checked = true;
    //     }
    //     const [isChecked, setIsChecked] = useState(checked);  
        
    //     const handleOnChange = () => {
    //         setIsChecked(!isChecked);
    //         update(!isChecked);   
    //     }

    //    checkboxes.push(<input key={i} checked={isChecked} type="checkbox" onChange={handleOnChange}/>)
    // }

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
                <div className="Tracker-container">
                    <Tracker goal={props.goal}></Tracker>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default SingleGoal;