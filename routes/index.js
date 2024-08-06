var express = require('express');
var router = express.Router();
const userModel=require("./users")


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/error', function(req, res, next) {
  res.render('error');
});


//FOR CREATION BELOW CODE

router.get('/create', async function(req, res, next) {
  const createdUser=await userModel.create({
    username:"Hassam",
    age:24,
    name:"Ali",
  },
  {
    username:"Asad",
    age:24,
    name:"Khan",
  }
  )
  res.send(createdUser)
});


//TO GET DATA BELOW CODE

router.get("/allUsers", async function(req,res){
  //To FIND SPECIFIC USERNAME
  // let allUsers=await userModel.findOne({username:"Asad"});
  // TO MAKE INSENSTIVI WE WILL USE RegExp 
  let allUsers=await userModel.find();

  res.send(allUsers);
});


router.get("/delete", async function(req,res){
  let deletedUser= await userModel.findOneAndDelete({username:"Hassam"});
  res.send(deletedUser);
})


router.get("/set-session", (req,res)=>{
req.session.ban=true;
res.send("Ban set ho gya hai")
})

router.get("/check-ban", (req,res)=>{
console.log(req.session);
res.send("Console mai dekho")
})




module.exports = router;
