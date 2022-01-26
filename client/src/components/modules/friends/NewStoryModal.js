import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import "../../../utilities.css";
import {Button, Modal} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import StoryInput from "./NewStoryInput"; 
import "./NewStoryModal.css";

const customStyles = {

    content : {
    //   bg: 'black',
    //   top: '80%',
    //   left: '50%',
    //   right: 'auto',
    //   bottom: 'auto',
    //   marginRight: '-50%',
    //   transform: 'translate(-50%, -50%)',
    //   height: '1000px', // <-- This sets the height
    //   width: '1000px',
    //   overflow: 'scroll' // <-- This tells the modal to scrol
    },
    button: {
        borderRadius: '30px'
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
                <Button variant="success" style = {customStyles.button} onClick={()=>{this.handleModal()}}>add post</Button>
                <Modal 
                    show={this.state.show} 
                    onHide={()=>this.handleModal()}
                    style={customStyles.content}
                    dialogClassName = "story-modal">
                <Modal.Header closeButton>new post</Modal.Header>
                <Modal.Body>
                    <div>
                        <StoryInput 
                            addNewStory={this.props.addNewStory}
                            userId={this.props.userId} ></StoryInput>
                    </div>
                </Modal.Body >
                </Modal>
                    
            </div>
        )
    }
}

export default Modals;