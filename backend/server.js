const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoute = require("./routes/UserRoute");
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
//console.log(process.env.MONGODB_URL);

app.use("/user", userRoute);

app.listen(port, () => {
  console.log(`Server is listening to http://localhost:${port}/`);
});

//app.use(express.static("../frontend"));
app.get("/*", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
  //res.sendFile(__dirname + "../frontend/index.html");
});
