const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const userRoute = require("./routes/UserRoute");
const app = express();
const port = 3000;

require("dotenv").config();
+app.use(express.json());
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
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log(`Connected to ${result.connection.name}`);
  })
  .catch((error) => {
    console.log(error);
  });
//console.log(process.env.MONGODB_URL);

/*app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});*/

app.use("/user", userRoute);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

app.use(express.static("../frontend"));
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});
