const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const bodyParser = require("body-parser");
const passport = require("passport")
const authRoutes = require('./src/routes/authRoutes');
const indexRoutes = require('./src/routes/indexRoutes');
const todoRoutes = require("./src/routes/todoRoutes");

const app = express();

app.set("view engine", "ejs");

// Middleware
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


// Routes
app.use('/', indexRoutes);
app.use('/', authRoutes);
app.use('/add', todoRoutes);
app.use('/remove', todoRoutes);
app.use('/edit', todoRoutes);
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});


mongoose.connect(config.mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });



passport.serializeUser(function (user_id, done) { done(null, user_id); });
passport.deserializeUser(function (user_id, done) { done(null, user_id); });


app.listen(process.env.PORT || 3000, function () {
  console.log("listening on port 3000!");
});
