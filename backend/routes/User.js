const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

const users = [];

router.get("/get_users", (req, res) => {
  res.json(users);
});

router.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = { username: req.body.username, password: hashedPassword };
    users.push(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post("/login", async (req, res, next) => {
  const user = users.find((user) => user.username === req.body.username);
  if (user == null) {
    return res.status(400).send("Can't find user");
  }
  try {
    const compare = await bcrypt.compare(req.body.password, user.password);
    if (compare) {
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
