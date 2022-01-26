import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import "../../utilities.css";
import {Button, Modal} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import GoalInputEdit from "./GoalInputEdit"; 
import "./EditModal.css";
import "./GoalList.css";

const customStyles = {

    content : {
      bg: 'black',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      height: '500px', // <-- This sets the height
      overlfow: 'scroll' // <-- This tells the modal to scrol
      
    },
      button : {
          borderRadius: '70px' 

    }
  };

class EditModal extends React.Component {

    constructor(props)
    {
        super(props)
        this.state={
            show:false,
            value: "",
            tags: [],
            frequency: 0,
            minimum: 0
        }
    }

    handleModal()
    {
        this.setState({show: !this.state.show})
        this.setState({value: this.props.goal.goalContent})
        this.setState({tags: this.props.goal.goalTags})
        this.setState({frequency: this.props.goal.frequency})
        this.setState({minimum: this.props.goal.minimum})
    }
    render() {
        return (
            <div>
                <div>
                <Button variant="warning" style={customStyles.button} onClick={()=>{this.handleModal()}}>edit</Button>
                </div>
                <div className="spacing">
                </div>
                <Modal 
                    show={this.state.show} 
                    onHide={()=>this.handleModal()}
                    style={customStyles.content}>
                <Modal.Header closeButton>input your goals</Modal.Header>
                <Modal.Body>
                    <div>
                        <GoalInputEdit 
                            value = {this.value}
                            userId = {this.props.userId}
                            goal = {this.goal}
                            goalId = {this.props.goalId}
                            addNewGoal={this.props.addNewGoal}
                            userId={this.props.userId} ></GoalInputEdit>
                    </div>
                </Modal.Body >
                </Modal>
                    
            </div>
        )
    }
}

export default EditModal;