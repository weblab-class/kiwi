import React, { useState } from "react";
import { get, post } from "../../utilities";

const icon_type = ['hand','lungs','heart','brain','misc','eyes','legs','biceps','core']

class Tracker extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        achievement: this.props.goal.achievement
      };
  
      this.handleInputChange = this.handleInputChange.bind(this);
    }
  
    handleInputChange(event) {
      const value = event.target.value;
      let newIcon = {}
  
      this.setState({
        achievement: value
      });

      console.log("ACHIEVEMENT", value)
      console.log("indexed", this.props.icon_indexed)
    
        const newAchievement = {
            creatorId: this.props.goal.creatorId,
            goalId: this.props.goal.goalId,
            achievement: value
        }
        // console.log("NEWACHIEVEMENT", newAchievement)
        post("/api/updateachievement", newAchievement)
        // console.log("AFTER POST REQUEST")

        for (let i = 0; i< this.props.goal.goalTags.length; i++){
          let typei = icon_type.indexOf(this.props.goal.goalTags[i]);
         // console.log(icon);
      //console.log(icon_state);
     
          
      if(this.props.goal.achievement==this.props.goal.frequency && this.props.icon_indexed[typei] <4){
          newIcon= {
          creatorId: this.props.goal.creatorId,
          type: typei,
          state: this.props.icon_indexed[typei]+1,
      }
      //console.log(newIcon.state);
      console.log("increase");
      post("/api/icons", newIcon);
     
    
      } else if (this.props.goal.achievement<this.props.goal.minimum && this.props.goal.achievement>0&& this.props.icon_indexed[typei] >0){
          newIcon= {
          creatorId: this.props.goal.creatorId,
          type: typei,
          state: this.props.icon_indexed[typei]-1,
      }
      console.log("decrease");
      post("/api/icons", newIcon);
      }else {newIcon= {
          creatorId: this.props.goal.creatorId,
          type: typei,
          state: this.props.icon_indexed[typei],
      }
      post("/api/icons", newIcon);
    }

    }
    }


  
    render() {

      if(this.state.achievement==0){
    
        //console.log(i_type,i_state);
        for (let i = 0; i< this.props.goal.goalTags.length; i++){
            let typei = icon_type.indexOf(this.props.goal.goalTags[i]);
           // console.log(icon);
        //console.log(icon_state);
       
     
        if(this.props.icon_indexed[typei]>0){
             let newIcon= {
            creatorId: this.props.goal.creatorId,
            type: typei,
            state: this.props.icon_indexed[typei]-1,
        }
        console.log("decrease 2")
        post("/api/icons", newIcon);
        }
        }
       
    }
 
      return (
        <form>
          <label>
            <input
              type="number"
              value={this.state.achievement}
              onChange={this.handleInputChange}
              max={this.props.goal.frequency}
              min={0}
              />

          </label>
        </form>
      );
    }
  };

export default Tracker;

  