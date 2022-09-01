import mongoose from "mongoose"

const mongoose_uri = process.env.MONGOOSE_URI

const connectDB = ()=>{
mongoose.connect("mongodb+srv://mahmoudgalal:seriallkiller@mahmoudgalal.ifddv.mongodb.net/formapp?retryWrites=true&w=majority",{useUnifiedTopology :true , useNewUrlParser: true})
.then(()=>console.log("connect to DB ⭐"))
.catch((err)=>console.log(err))
}


export default connectDB