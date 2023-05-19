const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());
const users = [];
app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/login", (req, res) => {
  const user = { name: req.body.name, password: req.body.password };
  users.push(user);
  res.json(req.body);
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
