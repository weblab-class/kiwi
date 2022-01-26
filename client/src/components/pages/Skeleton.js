import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import icon from '../../public/icon_illustration.png'
import "../../utilities.css";
import "./Skeleton.css";
import Icon from "../modules/Icon.js";
//import "../../../server/server.js";
//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "732721046468-8g0qe7o8qbddbvfkkrtu59tngop3dnh7.apps.googleusercontent.com";
import { get, post } from "../../utilities";
import GoalList from  "../modules/GoalList.js";
function IconComputation (g, user){
 // FROM HERE: param = goal_list
 let tags=[];
 let freq = [];
 let achievement=[];
 let min=[];
 g.forEach(function (item, index) {
     tags.push(item.goalTags);
     freq.push(item.frequency);
     achievement.push(item.achievement);
     min.push(item.minimum);
 });
 let freq_indexed = [0,0,0,0,0,0,0,0,0];
 let achievement_indexed=[0,0,0,0,0,0,0,0,0];
 let min_indexed=[0,0,0,0,0,0,0,0,0];
 const icon_type = ['hand','lungs','heart','brain','misc','eyes','legs','biceps','core']
 
 for (let i = 0; i < tags.length; i++) {
 for (let j = 0; j < tags[i].length; j++) {
 let place = icon_type.indexOf(tags[i][j]);
 freq_indexed[place]+=freq[i];
 achievement_indexed[place]+=achievement[i];
 min_indexed[place]+=min[i];
 }
 }
 let icons_total = [-1,-1,-1,-1,-1,-1,-1,-1,-1];
 for (let i = 0; i < freq_indexed.length; i++) {
   if (freq_indexed[i]==achievement_indexed[i] && freq_indexed[i] != 0){
     if(icons_total[i]!=4){
     icons_total[i]+=1;}
   }if (achievement_indexed[i]<=min_indexed[i]){
     if(icons_total[i]>0){
     icons_total[i]-=1;}
   }
 }
 for (let i = 0; i < icons_total.length; i++) {
   if(icons_total!=-1){
   const newIcon= {
     creatorId: user,
     type: i ,
     state: icons_total[i],
 }
 post(`/api/icons`, newIcon);}}
 return icons_total;
 }
class Skeleton extends Component {
 constructor(props) {
   super(props);
   this.state = {
     goal_list: [],
     icons_list:[],
      time: Date.now(),
   };
 }
  componentDidMount() {
   document.title = "Dashboard";
   //get(`/api/goals`, {creatorId:this.props.userId}).then((goals) =>
   //{this.setState({ goal_list: this.state.goal_list.concat(goals)})});
   var today = new Date();
   //this.interval = setInterval(() => this.setState({ time: Date.now() }), 100000);
   console.log(today.getDay());
   if(today.getDay() == 3 ){//&& today.getHours()==0 &&  today.getMinutes()==0  && today.getSeconds()==0){
   post(`/api/restartachievement`, {creatorId:this.props.userId});
   }
   get(`/api/icons`, {creatorId:this.props.userId}).then((icons) =>
   {this.setState({ icons_list: this.state.icons_list.concat(icons)})});
  
  
  
 }
/* componentWillUnmount() {
 clearInterval(this.interval);
 //post(`/api/restartachievement`, {creatorId:this.props.userId});
}*/
  render (){
   //window.location.reload();
   /*
   var today = new Date();
   if(today.getMinutes() == 25 ){//&& today.getHours()==0 &&  today.getMinutes()==0  && today.getSeconds()==0){
       let newAchievement = {
           creatorId: props.goal.creatorId,
           goalId: props.goal.goalId,
           achievement: 0,
          
       }
       console.log("set to zero");
       post("/api/updateachievement", newAchievement);
       }
   */
   //IconComputation(this.state.goal_list, this.props.userId); // Move this into if
 
   //console.log(this.state.icons_list);
   //FROM HERE: param = icons_total
   let icons_total=[-1,-1,-1,-1,-1,-1,-1,-1]; // If -1, empty
   this.state.icons_list.forEach(function (item, index){
     icons_total[item.type] = item.state;
   });
   //console.log(icons_total);
  
   const index = (0,1,2,3,4,5,6,7,8,9);
   let icons = []
   let icons_index = [];
   // Progress cols
   let icon_col1 = [-1,-1,-1];
   let icon_col2 = [-1,-1,-1];
   let icon_col3 = [-1,-1,-1];
   // Type cols
   let icon_col1_index= [9,9,9];
   let icon_col2_index= [9,9,9];
   let icon_col3_index= [9,9,9];
  
   for (let i = 0; i < icons_total.length; i++) {
     if (icons_total[i] !=-1){icons.push(icons_total[i]);icons_index.push(i);}
  
   }
   const num = icons.length;
   //console.log(icons_total);
   // Params: icon_col#, icon_col#_index, num
   if (num==1){icon_col2[1]=icons[0];
               icon_col2_index[1]=icons_index[0]}  
   else if (num ==2){icon_col1[1]=icons[0]; icon_col3[1]=icons[1];
       icon_col1_index[1]=icons_index[0]; icon_col3_index[1]=icons_index[1];}
   else if (num==3){icon_col1[1]=icons[0]; icon_col2[1]=icons[1];icon_col3[1]=icons[2];
     icon_col1_index[1]=icons_index[0]; icon_col2_index[1]=icons_index[1];icon_col3_index[1]=icons_index[2];}
   else if (num==4){icon_col2[0]=icons[3];icon_col1[1]=icons[0]; icon_col2[1]=icons[1];icon_col3[1]=icons[2];
     icon_col2_index[0]=icons_index[3];icon_col1_index[1]=icons_index[0]; icon_col2_index[1]=icons_index[1];icon_col3_index[1]=icons_index[2];}   
   else if (num==5){icon_col2[0]=icons[3];icon_col2[1]=icons[4];
     icon_col1[1]=icons[0]; icon_col2[1]=icons[1];icon_col3[1]=icons[2];
  
     icon_col2_index[0]=icons_index[3];icon_col2_index[1]=icons_index[4];
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
 
  
   //Mapping cols data to icons  
   if(this.state.icons_list.length==0 ){//&& today.getHours()==0 &&  today.getMinutes()==0  && today.getSeconds()==0){
     icon_col2[1]=0;
   }
   //console.log (icon_col1_index, icon_col2_index, icon_col3_index);
   //console.log(icon_col1, icon_col2, icon_col3);
   const images_col1 = icon_col1.map((image,index) => {
          return <Icon icon_id={icon_col1_index[index]} progress={icon_col1[index]}/>
       });
   const images_col2 = icon_col2.map((image,index) => {
          return <Icon icon_id={icon_col2_index[index]} progress={icon_col2[index]}/>
       });
   const images_col3 = icon_col3.map((image,index) => {
          return <Icon icon_id={icon_col3_index[index]} progress={icon_col3[index]}/>
       });
   var today=new Date();
   if(today.getSeconds() == 3 ){
     window.location.reload();
   }
   console.log("render");
       return (
         // Calling Icon.js
         /*
<head>
         <meta httpEquiv="refresh" content="604800"/>
         </head>
         */
       
      
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
         <div><GoalList userId = {this.props.userId}></GoalList></div>
       </div>   
     </>
);
 
 }
 
}
 
 
export default Skeleton;

