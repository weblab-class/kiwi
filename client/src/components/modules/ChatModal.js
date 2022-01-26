import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import "../../utilities.css";
import {Button, Modal} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import GoalInput from "./GoalInput"; 
import "./ChatModal.css";
import "./GoalList.css";
import Chat from "../modules/Chat.js";
import "./Chat.css";
import { NewMessage } from "../modules/NewMessage.js";

const customStyles = {

    content : {
    //   bg: 'black',
      backdrop: '0.1',
      top: '73%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      height: '500px', // <-- This sets the height
      overflow: 'scroll' // <-- This tells the modal to scroll
    
    },
      button : {
          borderRadius: '20px'
          
    },

    backdrop: {
        opacity:'0.1'
    },

      header : {
          bg: '#99d98c'
      }
  };

class ChatModal extends React.Component {

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
                <Button variant="link-dark" className="text-decoration-none" style={customStyles.button} onClick={()=>{this.handleModal()}}>{this.props.user}</Button>
                <Modal 
                    scrollable={true}
                    backdrop={false}
                    show={this.state.show} 
                    onHide={()=>this.handleModal()}
                    style={customStyles.content}>
                <Modal.Header closeButton style={customStyles.header}>{this.props.activeChat.recipient.name}</Modal.Header>
                <Modal.Body>
                    <div>
                    <Chat data={this.props.activeChat}></Chat>
                    </div>
                </Modal.Body >
                <Modal.Footer>
                <div className="Chat-newContainer">
                    <NewMessage recipient={this.props.activeChat.recipient} />
                </div>
                </Modal.Footer>
                </Modal>
                    
            </div>
        )
    }
}

export default ChatModal;