const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../schema/User");

router.get("/get_users", async (req, res) => {
  res.json(await User.find());
});

router.post("/register", async (req, res) => {
  try {
    const checkUser = User.exists({ username: req.body.username });
    if (checkUser != null) {
      throw new Error("User already existed");
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      username: req.body.username,
      password: hashedPassword,
    });
    await newUser.save();
    res.send(`User ${newUser.username} is registered`);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

router.post("/login", async (req, res) => {
  const verifyUser = await User.findOne({ username: req.body.username });

  if (verifyUser == null) res.status(400).send("Can't find user");

  try {
    bcrypt.compare(req.body.password, verifyUser.password, (err, result) => {
      if (result == true) {
        localStorage.setItem("id", JSON.stringify(verifyUser._id));
        res.send("Log in success");
      } else {
        res.send("Log in failed");
      }
    });
  } catch (e) {
    res.status(500).send(e);
  }
});

//router.post("/logout")
//router.post("/delete_account")
module.exports = router;
