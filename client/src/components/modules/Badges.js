import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import "../../utilities.css";
import {Button, Modal} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import GoalInput from "./GoalInput"; 
import "./Badges.css";
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
      borderRadius: '25px' 
    }
  };

class Badges extends React.Component {

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
                <div className="Badges-Center">
                <Button variant="secondary" style={customStyles.button} onClick={()=>{this.handleModal()}}>badges</Button>
                </div>
                <Modal 
                    show={this.state.show} 
                    onHide={()=>this.handleModal()}
                    style={customStyles.content}>
                <Modal.Header closeButton>badges you've earned</Modal.Header>
                <Modal.Body>
                    <div>
                        <img src="/Users/hyewonahn/weblab/ssu02-sravikumar19-gPdnjs02/skeleton-master/client/src/components/modules/kiwi.png"></img>
                    </div>
                </Modal.Body >
                </Modal>
                    
            </div>
        )
    }
}

export default Badges;