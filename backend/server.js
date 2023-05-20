const express = require("express");
const cors = require("cors");
const path = require("path");
const userRoute = require("./routes/User");
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

app.get("/", (req, res) => {
  //res.redirect("http://192.168.1.219:5500");
  res.sendFile(path.join(__dirname, "./public", "index.html"));
});

app.use("/user", userRoute);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
