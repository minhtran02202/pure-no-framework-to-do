const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../User");

const users = [];
var username;

/*
router.get("/get_users", (req, res) => {
  res.json(users);
});*/

router.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = { username: req.body.username, password: hashedPassword };
    users.push(user);
    res.json(user);
  } catch (e) {
    res.status(500).send(e);
  }
  /*
  const newUser = new User({
    username: req.body.username,
    password: hashedPassword,
  });

  newUser.save();


  //Update a collection
  User.findOne({id: "find", thing: update, (e)=>{
    if (e){
      console.log(e)
    }
  }})

  //Delete a collection
  User.deleteOne({id: delete}, (e)=>{
    if (e){
      console.log(e)
    }
  }
  */
});

router.post("/login", async (req, res, next) => {
  const verifyUser = users.find((user) => user.username === req.body.username);
  if (verifyUser == null) {
    return res.status(400).send("Can't find user");
  }
  try {
    const compare = await bcrypt.compare(req.body.password, user.password);
    if (compare) {
      username = req.body.username;
      res.send("Yay!");
    } else {
      res.send("Oh No!");
    }
  } catch (e) {
    return next(e);
    //res.status(500).send(e);
  }
});

module.exports = router;
