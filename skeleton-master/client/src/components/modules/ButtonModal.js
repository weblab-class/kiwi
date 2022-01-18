import React, { useState, useEffect } from "react";
import "../../utilities.css";
import {Button, Modal} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import "./ButtonModal.css";
import Bio from "./Bio.js";

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
    }
  };

class ButtonModals extends React.Component {
    constructor(props)
    {
        super(props)
        this.state={
            show:false,
            bio: "write your bio"
        }
    }

    componentDidMount() {
        fetch(`/api/user?userId=${this.props.userId}`)
        .then(response => response.json())
        .then(data => {
            if(data.bio === "") {
                this.setState({bio: "write your bio"});
            } else {
                this.setState({bio: data.bio})
            }
        })
        .catch(error => console.error(error));
    }

    handleModal()
    {     
        this.setState({show: true});
    }


    handleModal2()
    {     
        fetch(`/api/user?userId=${this.props.userId}`)
        .then(response => response.json())
        .then(data => {
            if(data.bio === "") {
                this.setState({bio: "write your bio"});
            } else {
                this.setState({bio: data.bio})
            }
        })
        .catch(error => console.error(error));
        this.setState({show: false});
    }


    render() {
        return (
            <div>
                <Button onClick={()=>{this.handleModal()}}>{this.state.bio}</Button>
                <Modal 
                    show={this.state.show} 
                    onHide={()=>this.handleModal2()}
                    style={customStyles.content}>
                <Modal.Header closeButton>input your bio</Modal.Header>
                <Modal.Body>
                    <Bio userId = {this.props.userId}/>
                </Modal.Body >
                </Modal>
                    
            </div>
        )
    }
}

export default ButtonModals;