const express = require('express');
const router = express.Router();
const userModel = require("./users"); // Ensure this path is correct
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.use(new LocalStrategy(userModel.authenticate()));
app.use(express.static(path.join(__dirname, 'public')))
// Middleware to parse request bodies
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

// Middleware to initialize passport and session
const session = require('express-session');
router.use(session({ secret: "secretKey", resave: false, saveUninitialized: false }));
router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/error', function(req, res, next) {
  res.render('error');
});

router.get('/profile', isLoggedIn, function(req, res) {
  res.render('profile');
});

router.post('/register', function(req, res) {
  const { username, secret, password } = req.body;
  const userData = new userModel({ username, secret });

  userModel.register(userData, password, function(err, registeredUser) {
    if (err) {
      console.log(err);
      res.redirect('/error');
    } else {
      passport.authenticate("local")(req, res, function() {
        res.redirect('/profile');
      });
    }
  });
});

// CODE FOR LOGIN
router.post("/login", passport.authenticate("local", {
  successRedirect: "/profile",
  failureRedirect: '/'
}), function(req, res) {});

// CODE FOR LOGOUT
router.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

// CODE FOR LOGIN MIDDLEWARE
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

// Additional routes for session handling
router.get("/set-session", (req, res) => {
  req.session.ban = true;
  res.send("Ban set ho gya hai");
});

router.get("/check-ban", (req, res) => {
  console.log(req.session);
  res.send("Console mai dekho");
});

module.exports = router;
