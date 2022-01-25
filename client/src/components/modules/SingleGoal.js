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
       if(today.getDay() == 2 ){//&& today.getHours()==0 &&  today.getMinutes()==0  && today.getSeconds()==0){
           newAchievement.achievement = 0;
       }
        post("/api/updateachievement", newAchievement);
        /*const newIcon= {
            creatorId: props.goal.creatorId,
            type: 2,
            state: 4,
            
        }*/
        //post("/api/updatestate", newIcon);
    
        const icon_type = ['hand','lungs','heart','brain','misc','eyes','legs','biceps','core']
        console.log(props.icons);
        let icon_indexed = [-1,-1,-1,-1,-1,-1,-1,-1,-1];
        let i_type = [];
        let i_state = [];
        props.icons.forEach(function (item, index) {
            i_type.push(item.type);
            i_state.push(item.state);
            console.log(i_type,i_state);
  });
        for (let i = 0; i< i_type.length; i++){
            icon_indexed[i_type[i]] = i_state[i];
        }
        console.log(i_type,i_state);
        for (let i = 0; i< props.goal.goalTags.length; i++){
            let typei = icon_type.indexOf(props.goal.goalTags[i]);
           // console.log(icon);
        //console.log(icon_state);
        var today = new Date();
    //if(today.getDay() == 2 ){//&& today.getHours()==0 &&  today.getMinutes()==0  && today.getSeconds()==0){
      
        if(props.goal.achievement==props.goal.frequency && icon_indexed[typei] <4){
            const newIcon= {
            creatorId: props.goal.creatorId,
            type: typei,
            state: icon_indexed[typei]+1,
        }
        console.log(newIcon.state);
        console.log("increase");
        post("/api/icons", newIcon);
        } else if (props.goal.achievement<props.goal.minimum && icon_indexed[typei] >0){
            const newIcon= {
            creatorId: props.goal.creatorId,
            type: typei,
            state: icon_indexed[typei]-1,
        }
        post("/api/icons", newIcon);
        }
    //}
          }
          //console.log(icon_state);}
    
    
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