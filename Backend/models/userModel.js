import mongoose, { Mongoose } from "mongoose";

const userSchems = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    cartData:{type:Object,default:{}}
},{minimize:false})

const userModels = mongoose.model.user || mongoose.model("user",userSchems);

export default userModels;