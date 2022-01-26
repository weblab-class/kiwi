import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";
import ReactDOM from 'react-dom';
import "../../utilities.css";
import {Button, Modal} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import "./StoryModal.css";
import "./GoalList.css";
import hand4 from '../../public/hand4.gif';
import bicep4 from '../../public/bicep4.gif';
import brain4 from '../../public/brain4.gif';
import core4 from '../../public/core4.gif';
import eye4 from '../../public/eye4.gif';
import leg4 from '../../public/leg4.gif';
import lung4 from '../../public/lung4.gif';
import plant4 from '../../public/plant4.gif';
import heart4 from '../../public/heart4.gif';

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

class StoryModal extends React.Component {

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
        const tags = ['hand','lungs','heart','brain','misc','eyes','legs','biceps','core'];

        const map = {
          'hand': hand4,
          'heart': heart4,
          'brain': brain4,
          'lungs': lung4,
          'legs': leg4,
          'eyes': eye4,
          'core': core4,
          'biceps': bicep4,
          'misc': plant4
        };
      
    const images = []
    if (typeof this.props.story.storyTags !== 'undefined') {
        const values = this.props.story.storyTags.map(object => object.label);
        tags.map((tag) => {
            if (values.includes(tag)) {
            images[tag] = map[tag];
            }else{
            images[tag] = "";
            }
        })
    }
        
        return (
            <div>
                <Button variant="link" onClick={()=>{this.handleModal()}}>{this.props.story.storyTitle}</Button>
                <Modal 
                    show={this.state.show} 
                    onHide={()=>this.handleModal()}
                    style={customStyles.content}>
                <Modal.Header closeButton>input your goals</Modal.Header>
                <Modal.Body>
                    <div className="Card-story">

                        <div className = "Card-container-grid">
                        <div className = "Profile-Pic">
                            <img src = {this.props.story.creatorImage}></img>
                        </div>

                        <div className = "Card-storyUser">
                            <Link to={`/profile/${this.props.story.creatorId}`} className="u-link u-bold">
                            {this.props.story.creatorName}
                            </Link>
                        </div>
                        <div className = "Card-storyTags">
                                <img src={images['heart']}></img>
                                <img src={images['brain']}></img>
                                <img src={images['lungs']}></img>
                                <img src={images['legs']}></img>
                                <img src={images['eyes']}></img>
                                <img src={images['core']}></img>
                                <img src={images['biceps']}></img>
                                <img src={images['misc']}></img>
                                <img src={images['hand']}></img>
                        </div>
                        </div>

                        <p className = "Card-storyLocation">{this.props.story.storyLocation}</p>
                        <p className="Card-storyTitle">{this.props.story.storyTitle}</p>
                        <p className = "Card-storyImage">
                        <img src={this.props.story.storyImage}></img>
                        </p>
                        <p className = "Card-storyContent">{this.props.story.storyContent}</p>
                        </div>
                </Modal.Body >
                </Modal>
                    
            </div>
        )
    }
}

export default StoryModal;