const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const LocalStorage = require("node-localstorage").LocalStorage;
global.localStorage = new LocalStorage("./scratch");

const userRoute = require("./routes/UserRoute");
const tasksRoute = require("./routes/TasksRoute");

const app = express();
const port = process.env.PORT || 3000;

require("dotenv").config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD", "DELETE", "PATCH"],
    credentials: true,
  })
);

//Connect MongoDB
mongoose
  .connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
  })
  .then((result) => {
    console.log(`Connected to ${result.connection.name}`);
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/user", userRoute);
app.use("/tasks", tasksRoute);

app.listen(port, () => {
  console.log(`Server is listening to http://localhost:${port}/`);
});

app.get("/*", (req, res) => {
  if (localStorage.getItem("login_success") === "true") {
    //send to app page
  } else {
    //send to login page
  }
  res.sendFile(__dirname + "/public/index.html");
});
