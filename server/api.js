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
    console.log(user.bio);
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


router.get("/goals", (req, res) => {
  //Get mongoSchema from Stella, put file in models
  Goals.find({creatorId: req.query.creatorId}).then((goals) => {
    res.send(goals);
  });
});
// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});


module.exports = router;

