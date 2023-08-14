const express = require("express");
const router = express.Router();
const User = require("../schema/User");

router.post("/save_tasks", async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: JSON.parse(localStorage.getItem("id")) },
      { tasks: req.body.data },
      { new: true }
    );
    res.status(200).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
