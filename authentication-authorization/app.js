const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const path = require("path");
const bcrypt = require("bcrypt");

app.set("view engine", "ejs");
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const userModel = require("./models/user");
const postModel = require("./models/post");

app.get("/", (req, res) => {
  res.render("index");
});

// TO CREATE USER WITH MONGODB
app.post("/create", async (req, res) => {
  try {
    let { username, email, password, age } = req.body;
    let user = await userModel.findOne({ email });
    if (user) return res.status(400).send("User already registered");

    // Hashing password
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        let createdUser = await userModel.create({
          username,
          email,
          password: hash,
          age,
        });

        let token = jwt.sign(
          { email: createdUser.email, userId: createdUser._id },
          "sdhkfsdf"
        );
        res.cookie("token", token);
        res.send(createdUser);
      });
    });
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  try {
    let user = await userModel.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("User not found");

    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (result) {
        let token = jwt.sign({ user: user.email }, "sdhkfsdf");
        res.cookie("token", token);
        res.send("Yes, you can log in");
      } else {
        res.status(400).send("Incorrect password");
      }
    });
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

app.get("/logout", (req, res) => {
  res.cookie("token", "");
  res.redirect("/login");
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});

// app.get("/", function (req, res) {
// res.send("done");

// Generate salt and hash the password
// bcrypt.genSalt(10, function (err, salt) {
//   if (err) {
//     console.error("Error generating salt:", err);
//     return;
//   }

//   bcrypt.hash("pololo", salt, function (err, hash) {
//     if (err) {
//       console.error("Error hashing password:", err);
//       return;
//     }
//     console.log("Generated hash:", hash);

//     // Compare the password with the hash (inside the callback)
//     bcrypt.compare("pololo", hash, function (err, result) {
//       if (err) {
//         console.error("Error comparing hash:", err);
//         return;
//       }
//       if (result) {
//         console.log("Password is correct");
//       } else {
//         console.log("Password is incorrect");
//       }
//     });
//   });
// });
// });

// app.get("/read", function (req, res) {
//   res.send("You are on Read Page");
// });

// Route to generate JWT and send it as a cookie
// app.get("/jwt", function (req, res) {
// Generate a JWT with user email as payload
// let token = jwt.sign({ email: "hassam12@gmail.com" }, "secret");

// Set the JWT as a cookie
//   res.cookie("token", token);
//   res.send("JWT token created and stored in cookie");
// });

// Route to verify the JWT from the cookie
// app.get("/jwtR", function (req, res) {
// Verify the JWT token from the cookie
//   try {
//     let data = jwt.verify(req.cookies.token, "secret");
//     console.log(data); // Prints the payload (email) if the token is valid
//     res.send("JWT is valid. Data: " + JSON.stringify(data));
//   } catch (err) {
//     res.status(403).send("Invalid or expired token");
//   }
// });

// app.listen(3000, function () {
//   console.log("Server is running on port 3000");
// });
