import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities";
import "../../utilities.css";
import GoalInput from "./GoalInput"; 
import { Link, navigate } from "@reach/router";
import Modal from "./Modal.js";
import Badges from "../modules/Badges.js";
import "./GoalList.css";
import SingleGoal from "./SingleGoal";

const GoalList = (props) => {
    const [goals, setGoals] = useState([]);
    const [icons, setIcons] = useState([]);

    const addNewGoal = (goalObj) => {
        {
            setGoals(goals.concat([goalObj]));
        };
    };

    useEffect(() => {
        get("/api/goals", { creatorId: props.userId }).then((goals) => {
          setGoals(goals);
        //console.log("PROPS, USERID", props.userId);
        console.log("GOALS LIST", goals);
        });

        get("/api/icons", { creatorId: props.userId }).then((icons) => {
            setIcons(icons);});
        
      }, []);

    return (
        <nav className="Title-container"> {/* nav is a tag just like div */ }
            {/* <div className="GoalList-title u-inlineBlock">goals</div> */}
            <div className="u-inlineBlock Modal">
                <Modal 
                    addNewGoal={addNewGoal} 
                    userId={props.userId}></Modal>
            </div>
                <div className="Outer-Box">
                    {goals.map((goal, i) => (
                        <SingleGoal
                            userId = {props.userId}
                            key={i}
                            goal = {goal}
                            icons = {icons}
                        />
                    ))} 
                <div>
                </div>

            </div>
        </nav>

    );
};

export default GoalList;
