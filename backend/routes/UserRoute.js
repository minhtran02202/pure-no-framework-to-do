const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../schema/User");

router.get("/get_users", async (req, res) => {
  res.json(await User.find());
});

router.post("/register", async (req, res) => {
  try {
    const checkUser = await User.exists({ username: req.body.username });
    if (checkUser) {
      res.send({ res: "User already existed" });
      return;
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      username: req.body.username,
      password: hashedPassword,
    });
    await newUser.save();
    res.send({ res: `User ${newUser.username} is registered` });
  } catch (e) {
    console.log(e);
    res.status(500).send({ err: e });
  }
});

router.post("/login", async (req, res) => {
  const verifyUser = await User.findOne({ username: req.body.username });

  if (verifyUser == null) res.status(400).send({ res: "Can't find user" });

  try {
    bcrypt.compare(req.body.password, verifyUser.password, (err, result) => {
      if (result == true) {
        localStorage.setItem("id", JSON.stringify(verifyUser._id));
        // send user to add page
        res.send({ res: "Log in success" });
      } else {
        // refresh back the login page
        res.send({ res: "Log in failed" });
      }
    });
  } catch (e) {
    res.status(500).send({ err: e });
  }
});

router.get("/logout", async (req, res) => {
  try {
    localStorage.setItem("id", "");
    // send user back to login page
    res.status(200).send("Log out successfull");
  } catch (err) {
    res.status(500).send({ err: e });
  }
});
//router.post("/delete_account")
module.exports = router;
