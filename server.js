require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const authRoutes = require("./routes/authRoutes");
const connection = require("./database/connection.js");
const expressSession = require("express-session");
const googleStrategy = require("./controllers/passport/passportGoogle");
const localStrategy = require("./controllers/passport/passportLocal");

const app = express();

app.use(
  expressSession({
    secret: "secretritesh",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use("/auth", authRoutes);

const PORT = process.env.PORT || 8080;
connection(process.env.MONGO_URI)
  .then(() => {
    console.log("Mongo connection successfull!");
    app.listen(PORT, () => {
      console.log(`server is running on port:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Database connection was not set...", error);
  });
