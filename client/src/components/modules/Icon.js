import React, { Component } from "react";
import { Link } from "@reach/router";
import empty from '../../public/empty.png';

import hand1 from '../../public/hand1.gif';
import hand2 from '../../public/hand2.gif';
import hand3 from '../../public/hand3.gif';
import hand4 from '../../public/hand4.gif';

import lung3 from '../../public/lung3.gif';
import lung4 from '../../public/lung4.gif';

import heart3 from '../../public/heart3.gif';
import heart4 from '../../public/heart4.gif';
import brain3 from '../../public/brain3.gif';
import brain4 from '../../public/brain4.gif';
import plant1 from '../../public/plant1.gif';
import plant2 from '../../public/plant2.gif';
import plant3 from '../../public/plant3.gif';
import plant4 from '../../public/plant4.gif';
import eye1 from '../../public/eye1.gif';
import eye2 from '../../public/eye2.gif';
import eye3 from '../../public/eye3.gif';
import eye4 from '../../public/eye4.gif';
import leg1 from '../../public/leg1.gif';
import leg2 from '../../public/leg2.gif';
import leg3 from '../../public/leg3.gif';
import leg4 from '../../public/leg4.gif';
import bicep3 from '../../public/bicep3.gif';
import bicep4 from '../../public/bicep4.gif';

import core3 from '../../public/core3.gif';
import core4 from '../../public/core4.gif';
import "./Icon.css";
// This identifies your web application to Google's authentication service
const GOOGLE_CLIENT_ID = "732721046468-8g0qe7o8qbddbvfkkrtu59tngop3dnh7.apps.googleusercontent.com";


class Icon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
      }
/*TODO
  Code icon display using local vars
  Implement MongoDB using router.get()
  Commit and merge (note to ask Shreya about App.js component)
*/

  render() {
    if(this.props.progress==0){ // No progress
          return ( <div className="Icon-container"><img src={empty} alt="icon.jpg"/></div>);
    }else if(this.props.icon_id==0){
          if(this.props.progress==1){ // Hand
              return ( <div className="Icon-container"><img src={hand1} alt="icon.jpg"/></div>);}
          else if (this.props.progress==2){
              return ( <div className="Icon-container"><img src={hand2} alt="icon.jpg"/></div>);}
          else if (this.props.progress==3){
              return ( <div className="Icon-container"><img src={hand3} alt="icon.jpg"/></div>);}
          else if (this.props.progress==4){
              return ( <div className="Icon-container"><img src={hand4} alt="icon.jpg"/></div>);}
    }else if(this.props.icon_id==1){ // Lung
          if(this.props.progress==1){ 
              return ( <div className="Icon-container"><img src={hand1} alt="icon.jpg"/></div>);}
          else if (this.props.progress==2){
              return ( <div className="Icon-container"><img src={hand2} alt="icon.jpg"/></div>);}
          else if (this.props.progress==3){
              return ( <div className="Icon-container"><img src={lung3} alt="icon.jpg"/></div>);}
          else if (this.props.progress==4){
              return ( <div className="Icon-container"><img src={lung4} alt="icon.jpg"/></div>);}
    }else if(this.props.icon_id==2){ // Heart
          if(this.props.progress==1){ 
              return ( <div className="Icon-container"><img src={hand1} alt="icon.jpg"/></div>);}
          else if (this.props.progress==2){
              return ( <div className="Icon-container"><img src={hand2} alt="icon.jpg"/></div>);}
          else if (this.props.progress==3){
              return ( <div className="Icon-container"><img src={heart3} alt="icon.jpg"/></div>);}
          else if (this.props.progress==4){
              return ( <div className="Icon-container"><img src={heart4} alt="icon.jpg"/></div>);}
    }else if(this.props.icon_id==3){ // Brain
         if(this.props.progress==1){ 
              return ( <div className="Icon-container"><img src={hand1} alt="icon.jpg"/></div>);}
          else if (this.props.progress==2){
              return ( <div className="Icon-container"><img src={hand2} alt="icon.jpg"/></div>);}
          else if (this.props.progress==3){
              return ( <div className="Icon-container"><img src={brain3} alt="icon.jpg"/></div>);}
          else if (this.props.progress==4){
              return ( <div className="Icon-container"><img src={brain4} alt="icon.jpg"/></div>);}
    }else if(this.props.icon_id==4){ // Plant
          if(this.props.progress==1){ 
              return ( <div className="Icon-container"><img src={plant1} alt="icon.jpg"/></div>);}
          else if (this.props.progress==2){
              return ( <div className="Icon-container"><img src={plant2} alt="icon.jpg"/></div>);}
          else if (this.props.progress==3){
              return ( <div className="Icon-container"><img src={plant3} alt="icon.jpg"/></div>);}
          else if (this.props.progress==4){
              return ( <div className="Icon-container"><img src={plant4} alt="icon.jpg"/></div>);}
    }else if(this.props.icon_id==5){ // Eyes
                    if(this.props.progress==1){ 
              return ( <div className="Icon-container"><img src={eye1} alt="icon.jpg"/></div>);}
          else if (this.props.progress==2){
              return ( <div className="Icon-container"><img src={eye2} alt="icon.jpg"/></div>);}
          else if (this.props.progress==3){
              return ( <div className="Icon-container"><img src={eye3} alt="icon.jpg"/></div>);}
          else if (this.props.progress==4){
              return ( <div className="Icon-container"><img src={eye4} alt="icon.jpg"/></div>);}   
    }else if(this.props.icon_id==6){ // Legs
                        if(this.props.progress==1){ 
              return ( <div className="Icon-container"><img src={leg1} alt="icon.jpg"/></div>);}
          else if (this.props.progress==2){
              return ( <div className="Icon-container"><img src={leg2} alt="icon.jpg"/></div>);}
          else if (this.props.progress==3){
              return ( <div className="Icon-container"><img src={leg3} alt="icon.jpg"/></div>);}
          else if (this.props.progress==4){
              return ( <div className="Icon-container"><img src={leg4} alt="icon.jpg"/></div>);}
    }else if(this.props.icon_id==7){ // Biceps
          if(this.props.progress==1){ 
              return ( <div className="Icon-container"><img src={hand1} alt="icon.jpg"/></div>);}
          else if (this.props.progress==2){
              return ( <div className="Icon-container"><img src={hand2} alt="icon.jpg"/></div>);}
          else if (this.props.progress==3){
              return ( <div className="Icon-container"><img src={bicep3} alt="icon.jpg"/></div>);}
          else if (this.props.progress==4){
              return ( <div className="Icon-container"><img src={bicep4} alt="icon.jpg"/></div>);}
    }else if(this.props.icon_id==8){ // Core
                    if(this.props.progress==1){ 
              return ( <div className="Icon-container"><img src={hand1} alt="icon.jpg"/></div>);}
          else if (this.props.progress==2){
              return ( <div className="Icon-container"><img src={hand2} alt="icon.jpg"/></div>);}
          else if (this.props.progress==3){
              return ( <div className="Icon-container"><img src={core3} alt="icon.jpg"/></div>);}
          else if (this.props.progress==4){
              return ( <div className="Icon-container"><img src={core4} alt="icon.jpg"/></div>);}
    }
    /*if (this.props.progress==2){
    return ( <div className="Icon-container"><img src={hand} alt="icon.jpg"/></div>);}
    else {
     return ( <div className="Icon-container"><img src={empty} alt="icon.jpg"/></div>);}
    */

    

}

}

export default Icon;