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
  //Simple register
  /*try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = { username: req.body.username, password: hashedPassword };
    users.push(user);
    console.log(req.body.username);
    res.json(user);
  } catch (e) {
    res.status(500).send(e);
  }*/

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      username: req.body.username,
      password: hashedPassword,
    });
    await newUser.save();
    res.send(`User ${newUser.username} is registered`);
  } catch (e) {
    res.status(500).send(e);
  }

  //Update a collection (change password)
  /*User.findOne({id: "find", thing: update, (e)=>{
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

router.post("/login", async (req, res) => {
  const verifyUser = await User.findOne({ username: req.body.username });

  if (verifyUser == null) res.status(400).send("Can't find user");

  try {
    bcrypt.compare(req.body.password, verifyUser.password, (err, result) => {
      if (result == true) {
        //localStorage.setItem("username", req.body.username);
        res.send("Log in success");
      } else {
        res.send("Log in failed");
      }
    });
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
