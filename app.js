const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

const chirp = require("./api/Chirp/routes/chirpRoutes");
const user = require("./api/User/routes/userRoutes");

//Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const BASE_URI = "mongodb://localhost:27017/test";
const MONGO_URI =
  process.env.NODE_ENV === "test"
    ? `${BASE_URI}/${process.env.TEST_SUITE}`
    : `${BASE_URI}/chirp_test`;

//connecting to MongDB
mongoose
  .connect(
    MONGO_URI,
    { useNewUrlParser: true }
  )
  .then(() => console.log("Mongo is Running"))
  .catch(err => console.log(err));

// Use Routes
app.use("/api/Chirp/routes/chirpRoutes", chirp);
app.use("/api/User/routes/userRoutes", user);

//Express App
const port = process.env.PORT || 27017;
app.listen(port, () =>
  console.log(`Mongoose's are running around on port ${port}`)
);

module.exports = App;
