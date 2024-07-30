var express = require('express');
var router = express.Router();
const userModel=require("./users")


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});


//FOR CREATION BELOW CODE

// router.get('/create', async function(req, res, next) {
//   const createdUser=await userModel.create({
//     username:"Hassam",
//     age:24,
//     name:"Ali",
//   },
//   {
//     username:"Asad",
//     age:24,
//     name:"Khan",
//   }
//   )
//   res.send(createdUser)
// });


//TO GET DATA BELOW CODE

router.get("/allUsers", async function(req,res){
  //To FIND SPECIFIC USERNAME
  // let allUsers=await userModel.findOne({username:"Asad"});
  let allUsers=await userModel.find();

  res.send(allUsers);
});


router.get("/delete", async function(req,res){
  let deletedUser= await userModel.findOneAndDelete({username:"Hassam"});
  res.send(deletedUser);
})




module.exports = router;
