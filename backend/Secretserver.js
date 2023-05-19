const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const cors = require("cors");
const app = express();
const User = require("./User");
const port = 3000;

// middleware and routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(
  cors({
    origin: "http://192.168.1.219:5500",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD", "DELETE", "PATCH"],
    credentials: true,
  })
);

//Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/to-do", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "User not found" });
      }
      bcrypt.compare(password, user.password, (bcryptErr, result) => {
        if (bcryptErr) {
          return done(bcryptErr);
        }
        if (result) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Invalid password" });
        }
      });
    });
  })
);

passport.use(
  "register",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    (req, username, password, done) => {
      User.findOne({ username }, (err, user) => {
        if (err) {
          return done(err);
        }

        if (user) {
          return done(null, false, { message: "Username already exists" });
        }

        const newUser = new User({ username, password });

        bcrypt.genSalt(10, (saltErr, salt) => {
          if (saltErr) {
            return done(saltErr);
          }

          bcrypt.hash(newUser.password, salt, (hashErr, hashedPassword) => {
            if (hashErr) {
              return done(hashErr);
            }

            newUser.password = hashedPassword;

            newUser.save((saveErr) => {
              if (saveErr) {
                return done(saveErr);
              }

              return done(null, newUser);
            });
          });
        });
      });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

app.post("/login", passport.authenticate("local"), (req, res) => {
  const token = jwt.sign({ username: req.user.username }, "secret_key");
  res.json({ token });
});

app.post("/register", (req, res, next) => {
  passport.authenticate("register", (err, user) => {
    if (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (!user) {
      return res.status(400).json({ error: "Username already exists" });
    }

    req.login(user, (loginErr) => {
      if (loginErr) {
        return res.status(500).json({ error: "Internal Server Error" });
      }

      return res.status(201).json({ message: "User registered successfully" });
    });
  })(req, res, next);
});

app.get("/protected", passport.authenticate("local"), (req, res) => {
  res.json({ message: "Authenticated route" });
});

app.listen(port, () => {
  console.log(`Server is listening to port ${port}`);
});
