const { stringify } = require("jade/lib/utils");
const mongoose=require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/newDataBase")


const userSchema=mongoose.Schema({
username:String,
name:String,
age:Number,
categories:{
    type:Array,
    default:[]
}
})

module.exports=mongoose.model("user", userSchema);