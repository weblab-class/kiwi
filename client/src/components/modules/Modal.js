import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import "../../utilities.css";
import {Button, Modal} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import GoalInput from "./GoalInput"; 
import "./Modal.css";
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

class Modals extends React.Component {

    constructor(props)
    {
        super(props)
        this.state={
            show:false
        }
    }

    handleModal()
    {
        this.setState({show: !this.state.show})
    }
    render() {
        return (
            <div>
                <div>
                <Button variant="primary" style={customStyles.button} onClick={()=>{this.handleModal()}}>+</Button>
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
                        <GoalInput 
                            addNewGoal={this.props.addNewGoal}
                            userId={this.props.userId} ></GoalInput>
                    </div>
                </Modal.Body >
                </Modal>
                    
            </div>
        )
    }
}

export default Modals;