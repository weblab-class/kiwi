/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const Goals = require("./models/goals");
const Icons = require("./models/icons");


// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");


router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user) socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

router.get("/user", (req, res) => {
  console.log("1", req.query.userId);
  User.findById(req.query.userId).then((user) => {
    res.send(user);
  })
  .catch((error) => console.error(error));
});

router.post("/bio", auth.ensureLoggedIn, (req, res) => {
  console.log(`Received a bio from ${req.user.name}: ${req.body.value}`);
  User.findById(req.user._id).then((user) => {
    user.bio = req.body.value;
    user.save();
  });

  // return "";
  // return res.json();
})

router.post("/interests", auth.ensureLoggedIn, (req, res) => {
  console.log(`Received interests from ${req.user.name}: ${req.body.value}`);
  User.findById(req.user._id).then((user) => {
    user.interests = req.body.value;
    user.save();
  })
})

router.post("/image", auth.ensureLoggedIn, (req, res) => {
  console.log(`Received interests from ${req.user.name}`);
  User.findById(req.user._id).then((user) => {
    user.image = req.body.value;
    user.save();
  })
})


router.post("/goal", auth.ensureLoggedIn, (req, res) => {

  const newGoal = new Goals({
    creatorId: req.body.creatorId,
    goalId: req.body.goalId,
    goalContent: req.body.content,
    goalTags: req.body.tags,
    frequency: req.body.frequency,
    minimum: req.body.minimum,
    achievement: req.body.achievement,
  });
  {/* newgoal in GoalInput */}

  console.log(req.body);
  newGoal.save().then((goal) => res.send(goal));
});



router.post("/icons", (req, res) => {
  const newIcon = {
    creatorId: req.body.creatorId,
    type: req.body.type,
    state: req.body.state,
  }
  console.log(req.body);
  //newIcon.save().then((icon) => res.send(icon));
  Icons.updateOne({creatorId: req.body.creatorId, type: req.body.type}, 
    newIcon, {"upsert": true, "useFindAndModify":false}).then(replacedDocument => {
    if(replacedDocument) {
      console.log(`Successfully replaced the following document: ${replacedDocument}.`)
    } else {
      console.log("No document matches the provided query.")
    }
  });
  /*Icons.findOne( {creatorId: req.body.creatorId, type: req.body.type}).then((icon) => {
    icon.state = req.body.state  ;
    icon.save();
  });*/
  //newIcon.save().then((icons) => res.send(icons));
});
router.post("/updatestate", (req, res) => {
  console.log("BODY", req.body);
  Icons.findOne( {creatorId: req.body.creatorId, type: req.body.type}).then((icon) => {
      icon.state = req.body.state ;
      icon.save();
  });
});
router.get("/goals", (req, res) => {
  //Get mongoSchema from Stella, put file in models
  Goals.find({creatorId: req.query.creatorId}).then((goals) => {
    res.send(goals);
  });
});

router.post("/updateachievement", (req, res) => {
  console.log("BODY", req.body);
  Goals.findOne( {creatorId: req.body.creatorId, goalId: req.body.goalId}).then((goal) => {
      goal.achievement = req.body.achievement  ;
      goal.save();
  });
});

router.post("/updatestate", (req, res) => {
  console.log("BODY", req.body);
  Icons.findOne( {creatorId: req.body.creatorId, type: req.body.type}).then((icon) => {
      icon.state = req.body.state ;
      icon.save();
  });
});

router.get("/icons", (req, res) => {
  Icons.find({creatorId: req.query.creatorId}).then((icons) => {
    res.send(icons);
  });
});

router.get("/singleicon", (req, res) => {
  Icons.find({creatorId: req.query.creatorId, type: req.query.type}).then((icons) => {
    console.log(res.json(res));
    res.send(icons);
  });
});


// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});


module.exports = router;

