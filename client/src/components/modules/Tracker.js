import React, { useState } from "react";
import { get, post } from "../../utilities";

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
  
      this.setState({
        achievement: value
      });

      console.log("ACHIEVEMENT", value)
    
        const newAchievement = {
            creatorId: this.props.goal.creatorId,
            goalId: this.props.goal.goalId,
            achievement: value
        }
        console.log("NEWACHIEVEMENT", newAchievement)
        post("/api/updateachievement", newAchievement)
        console.log("AFTER POST REQUEST")
    }


  
    render() {
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

  