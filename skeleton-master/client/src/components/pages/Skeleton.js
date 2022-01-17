import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import icon from '../../public/icon_illustration.png'
import "../../utilities.css";
import "./Skeleton.css";
import Icon from "../modules/Icon.js";
//import "../../../server/server.js";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "732721046468-lqep618inia61e4p3nlvn1jft5c58fp4.apps.googleusercontent.com";
import { get } from "../../utilities";

class Skeleton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goal_list: [],
    };
  }
  componentDidMount() {
    document.title = "Dashboard";
    get(`/api/goals`, {creatorId:this.props.userId}).then((goals) => 
    {this.setState({ stories: this.state.goal_list.push([goals])})});

  }
  render (){
    console.log(this.props.userId);
    //get("/api/Goals", {creatorId:this.props.userId}).then;

    console.log(this.state.goal_list);
    
    /* 
    0 hand
    1 Lung (aerobic)
    2 Heart (cardio)
    3 Brain (meditation, mental health, studying)
    4 Plant (miscellaneous)
    5 Eyes (screen time)
    6 Legs 
    7 Biceps 
    8 Core 

    */
    //console.log(user);
    const icons_total = [4,4,4,4,4,4,1,4,4]; // Progress state (1-4)
    const index = (0,1,2,3,4,5,6,7,8,9);
    let icons = []
    let icons_index = [];
    let icon_col1 = [0,0,0];
    let icon_col2 = [0,0,0];
    let icon_col3 = [0,0,0];
    // 9 is empty/undefined placer (since 0 is indexed)
    let icon_col1_index= [9,9,9];
    let icon_col2_index= [9,9,9];
    let icon_col3_index= [9,9,9];
    
    for (let i = 0; i < icons_total.length; i++) {
      if (icons_total[i] !=0){icons.push(icons_total[i]);icons_index.push(i);}
    
    }
    //_index
    const num = icons.length;
    //console.log(icons, icons_index);
    // Code to decide grid appearance from num if icons
    if (num==1){icon_col2[1]=icons[0];
                icon_col2_index[1]=icons_index[0]}   
    else if (num ==2){icon_col1[1]=icons[0]; icon_col3[1]=icons[1];
        icon_col1_index[1]=icons_index[0]; icon_col3_index[1]=icons_index[1];}
    else if (num==3){icon_col1[1]=icons[0]; icon_col2[1]=icons[1];icon_col3[1]=icons[2];
      icon_col1_index[1]=icons_index[0]; icon_col2_index[1]=icons_index[1];icon_col3_index[1]=icons_index[2];} 
    else if (num==4){icon_col2[0]=icons[3];icon_col1[1]=icons[0]; icon_col2[1]=icons[1];icon_col3[1]=icons[2];
      icon_col2_index[0]=icons_index[3];icon_col1_index[1]=icons_index[0]; icon_col2_index[1]=icons_index[1];icon_col3_index[1]=icons_index[2];}    
    else if (num==5){icon_col1[0]=icons[3];icon_col3[0]=icons[4];
      icon_col1[1]=icons[0]; icon_col2[1]=icons[1];icon_col3[1]=icons[2];
    
      icon_col1_index[0]=icons_index[3];icon_col3_index[0]=icons_index[4];
      icon_col1_index[1]=icons_index[0]; icon_col2_index[1]=icons_index[1];icon_col3_index[1]=icons_index[2];}     
    else if (num==6){icon_col1[0]=icons[3];icon_col3[0]=icons[4];icon_col2[0]=icons[5];
      icon_col1[1]=icons[0]; icon_col2[1]=icons[1];icon_col3[1]=icons[2];
    
      icon_col1_index[0]=icons_index[3];icon_col3_index[0]=icons_index[4];icon_col2_index[0]=icons_index[5];
      icon_col1_index[1]=icons_index[0]; icon_col2_index[1]=icons_index[1];icon_col3_index[1]=icons_index[2];}  
    else if (num==7){icon_col1[0]=icons[3];icon_col3[0]=icons[4];icon_col2[0]=icons[5];
      icon_col1[1]=icons[0]; icon_col2[1]=icons[1];icon_col3[1]=icons[2];
      icon_col2[2]=icons[6];
    
      icon_col1_index[0]=icons_index[3];icon_col3_index[0]=icons_index[4];icon_col2_index[0]=icons_index[5];
      icon_col1_index[1]=icons_index[0]; icon_col2_index[1]=icons_index[1];icon_col3_index[1]=icons_index[2];
      icon_col2_index[2]=icons_index[6];}     
    else if (num==8){icon_col1[0]=icons[3];icon_col3[0]=icons[4];icon_col2[0]=icons[5];
      icon_col1[1]=icons[0]; icon_col1[2]=icons[1];icon_col3[1]=icons[2];
      icon_col2[2]=icons[6]; icon_col3[2]=icons[7];
    
      icon_col1_index[0]=icons_index[3];icon_col3_index[0]=icons_index[4];icon_col2_index[0]=icons_index[5];
      icon_col1_index[1]=icons_index[0]; icon_col2_index[1]=icons_index[1];icon_col3_index[1]=icons_index[2];
      icon_col2_index[2]=icons_index[6]; icon_col3_index[2]=icons_index[7];}  
    else if   (num==9)   {
      icon_col1 = icons.slice(0,3);
      icon_col2 = icons.slice(3,6);
      icon_col3 = icons.slice(6,9);

      icon_col1_index = icons_index.slice(0,3);
      icon_col2_index = icons_index.slice(3,6);
      icon_col3_index = icons_index.slice(6,9);

    }
    //console.log(icon_col1, icon_col2,icon_col3);
    //console.log(icon_col1_index, icon_col2_index,icon_col3_index);


    //Mapping cols data to icons   
    const images_col1 = icon_col1.map((image,index) => {
           return <Icon icon_id={icon_col1_index[index]} progress={icon_col1[index]}/>
        });
    const images_col2 = icon_col2.map((image,index) => {
           return <Icon icon_id={icon_col2_index[index]} progress={icon_col2[index]}/>
        });
    const images_col3 = icon_col3.map((image,index) => {
           return <Icon icon_id={icon_col3_index[index]} progress={icon_col3[index]}/>
        });
  return (
    
    // Calling Icon.js
    <> 
    <div className="column">
    <div className="Icon-allContainer"> {images_col1}</div>
    </div>
    <div className="column">
    <div className="Icon-allContainer"> {images_col2}</div>
    </div>
    <div className="column">
    <div className="Icon-allContainer"> {images_col3}</div>
    </div>
    </>
  );
  }

}


export default Skeleton;
