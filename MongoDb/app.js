const express=require('express');
const app=express();

//Now importing model from UserModel which is important for CRUD actions
const UserModel=require('./userModel')


app.get('/',(req,res)=>{
    res.send("hey learning MongoDb");
})


app.get('/create', async (req,res)=>{
    let createduser= await UserModel.create({
        name:'HassamAmer',
        email:"hasi@gmail.com",
        userName:"Hassamkhan"
    })
    res.send(createduser)
})

//METHOD TO UPDATE A FUNCTION IN WHICH USER CAN UPDATE INFO SPECIFICALLY
app.get('/update', async (req,res)=>{
    let updatedUser= await UserModel.findOneAndUpdate({userName:"Hassam"}, {name:"Malik Hassam"},{new:true})
    res.send(updatedUser)
})

//METHOD TO READ THE USER
app.get('/read', async (req,res)=>{
    let read= await UserModel.find();
    res.send(read)
})
//METHOD TO Delete THE USER
app.get('/delete', async (req,res)=>{
    let user= await UserModel.findOneAndDelete({name:"HassamAmer"});
    res.send(user)
})


app.listen(3000);