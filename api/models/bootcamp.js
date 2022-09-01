import mongoose from "mongoose";


const bootcampschema = new mongoose.Schema({
  name:{
    type:String,
    required:[true , "wrong name"], 
    unique:true,
  },
  desc:{
    type:String,
    required:[true , "wrong description"]
  },
  price:{
    type:Number,
    required:[true , "please add the price"],
  },
  rating:{
    type:Number,
    required:[true,"wrong rating"],
  }
})

export const Bootcamp = new mongoose.model("Bootcamp" , bootcampschema)