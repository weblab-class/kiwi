import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import icon from '../../public/icon_illustration.png'
import "../../utilities.css";
import "./Skeleton.css";
import Icon from "../modules/Icon.js";
//import "../../../server/server.js";
//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "732721046468-8g0qe7o8qbddbvfkkrtu59tngop3dnh7.apps.googleusercontent.com";
import { get } from "../../utilities";
import GoalList from  "../modules/GoalList.js";

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
    {this.setState({ goal_list: this.state.goal_list.concat(goals)})});
  }
  render (){
    // get(`/api/goals`, {creatorId:this.props.userId}).then((goals) => 
    // {this.setState({ goal_list: this.state.goal_list.concat(goals)})});
    let tags=[];
    let freq = [];
    let achievement=[];
    let min=[];
    this.state.goal_list.forEach(function (item, index) {
      tags.push(item.goalTags);
      freq.push(item.frequency);
      achievement.push(item.achievement);
      min.push(item.minimum);
});
if (tags.length!=freq.length!=achievement.length){
  console.log("length error")
}
    //let tags_indexed=[];
    let freq_indexed = [0,0,0,0,0,0,0,0,0];
    let achievement_indexed=[0,0,0,0,0,0,0,0,0];
    let min_indexed=[0,0,0,0,0,0,0,0,0];
    const icon_type = ['hand','lungs','heart','brain','misc','eyes','legs','biceps','core']
  
    for (let i = 0; i < tags.length; i++) {
    for (let j = 0; j < tags[i].length; j++) {
    let place = icon_type.indexOf(tags[i][j]);
    freq_indexed[place]+=freq[j];
    achievement_indexed[place]+=achievement[j];
    min_indexed[place]+=min[j];
    }
    }
    let icons_total = [0,0,0,0,0,0,0,0,0];
    for (let i = 0; i < freq_indexed.length; i++) {
      if (freq_indexed[i]==achievement_indexed[i]){
        if(icons_total[i]!=4){
        icons_total[i]+=1;}
      }if (achievement_indexed[i]<=min_indexed[i]){
        if(icons_total[i]>0){
        icons_total[i]-=1;}
      }
    }
    console.log(freq);
    console.log(achievement);
    console.log(min);
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
     // Progress state (1-4)
    // icons_total = [1,3,0,4,0,4,4,0,0];
    
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
        
         <div className="page">
         <div>
         <div className="Icon-allContainer"> {images_col1}</div>
         </div>
         <div>
         <div className="Icon-allContainer"> {images_col2}</div>
         </div>
         <div>
         <div className="Icon-allContainer"> {images_col3}</div>
         </div>
          <div>
          <GoalList userId = {this.props.userId}></GoalList></div>
        </div>
       
   </>
 );

  }

}


export default Skeleton;
