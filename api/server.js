import  express  from "express";
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
dotenv.config()
import router from "./routes/bootcamps-routes.js"
import errorHandler from "./middleware/errorhandler.js";


const app = express()
app.use(cors())
app.use(express.json({extended:true}))
app.use(express.urlencoded({extended:true}))

connectDB()

const port = process.env.PORT || 5000


// app-routes
app.use("/api/bootcamps", router)

// Errors
app.use(errorHandler)





app.listen(port , ()=>console.log(`server is runing on port ${port} 👍`))


