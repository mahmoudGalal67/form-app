  import asynchandler from "../middleware/asynchandler.js"
import ErrorResponse from "../utiles/erroerResponse.js";
import { Bootcamp } from "../models/bootcamp.js";

const getbootcamps = asynchandler( async (req,res)=>{
let querydata
const query = {...req.query}

const removed = ["sort"]  
const uivalues = {
  filtering:{},
  filter:{}
}

removed.forEach((val)=> delete query[val] )

const filterKeys = Object?.keys(query );
const filtervalues = Object?.values(query)

filterKeys.forEach((val , indx)=>{
  uivalues.filtering[val] = filtervalues[indx]
})

let querystr = JSON.stringify(query)

querystr = querystr.replace(/\b(lte|lt|gte|gt|in)\b/g , (str)=> `$${str}`)
querydata = Bootcamp.find(JSON.parse(querystr))


if(req.query.sort){
  let sortbyarr = req.query.sort
  // let order
  // if(sortbyarr[0]==="-"){
  //   order = "ascending"
  // }
  // else{
  //   order = "descending"
  // }
  // uivalues.filter.price = order ;
  
  querydata = querydata.sort(sortbyarr)
}
else{
  querydata.sort("price")
}

const maxprice = await Bootcamp.find().sort({price :-1}).limit(1).select("-_id price")
const minprice = await Bootcamp.find().sort({price :1}).limit(1).select("-_id price")

uivalues.maxprice = maxprice[0]?.price
uivalues.minprice = minprice[0]?.price
const bootcamps = await querydata
res.status(200).json({
  success:true,
  data:bootcamps,
  uivalues,
})
})

const addbootcamp = asynchandler( async(req,res)=>{
  const bootcamp = await Bootcamp.create(req.body);

  res.status(201).json({
    success: true,
    data: bootcamp,
  });
});


const updatebootcamp = asynchandler( async (req,res)=>{
  let bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp with id ${req.params.id} was not found`, 404)
    );
  }

  bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(201).json({
    success:true,
    data:bootcamp,
  })
})

const deletebootcamp = asynchandler( async (req,res)=>{
  let bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp with id ${req.params.id} was not found`, 404)
    );
  }
await bootcamp.remove()
res.status(200).json({
  success:true,
  data:{}
})
})

export {getbootcamps , addbootcamp , updatebootcamp , deletebootcamp}