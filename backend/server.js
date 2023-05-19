const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://192.168.1.219:5500",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD", "DELETE", "PATCH"],
    credentials: true,
  })
);
const users = [];

app.get("/", (req, res) => {
  //res.redirect("http://192.168.1.219:5500");
  res.sendFile(path.join(__dirname, "./public", "index.html"));
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/register", (req, res) => {
  const user = { username: req.body.name, password: req.body.password };
  users.push(user);
  res.json(req.body);
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
