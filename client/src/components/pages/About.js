import React from "react";
import "./About.css";
 
const About = () => {
 return (
   <div className = "Container">
   <div>
     <h1>about kiwi </h1>
     <body>kiwi is the place to imagine your healthier future! Grow adorable illustrations by tracking the progress of your weekly health goals! For
     more information on how to use kiwi, see below. Please login to get started!
     </body>
      <h2> dashboard </h2> 
         <body>The kiwi dashboard is the page where you can create goals, input your progress, and grow your areas of focus.
         To begin, click the + button and add a new goal with all of the necessary fields. After you have added a goal, check the boxes
         to indicate your progress on the corresponding goal.
         </body>
        
         <body> After you have indicated your progress, refresh the page to simulate the end of the week (sometimes, you may need to double-click the reload button in Chrome
            if it takes too long to load). If you do not hit your minimum, your areas of focus will shrink. There are 5 stages of growth for each area of focus.
         </body>
 
	    <h2> social </h2>
         <body> kiwi includes a social page where you can post content, in the form of photos or text, with your friends. You can share your workout routines or celebrate your 
           accomplishments with others. There is also an easy way to view posts of particular topics by using the filter on top of the page. You can also chat with your friends by 
           clicking on the name of whoever you want to chat with in the chat box.
        </body>
      
   </div>
   </div>
 );
};

export default About;
