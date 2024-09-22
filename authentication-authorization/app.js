const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
const path=require('path');
app.set("view engine", "ejs");
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));
const userModel=require("./models/user")
const bcrypt=require('bcrypt');
app.get('/',(req,res)=>{
  res.render('index')
})
//TO CREATE USER WITH MONGODB BELOW IS THE CODE
app.post('/create', (req,res)=>{
  let{username, email, password,age}=req.body;
  bcrypt.genSalt(10,(err,salt)=>{
    bcrypt.hash(password,salt, async(err,hash)=>{
      let createdUser= await userModel.create({
        username,
        email,
        password:hash,
        age
      });
      res.send(createdUser);
    })
    })
  })


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

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
