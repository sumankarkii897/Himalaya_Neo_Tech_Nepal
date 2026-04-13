import express from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import db from './config/db.js';
import errorHandler from './middleware/errorHandler.js';
import authRoute from "./routes/authRoute.js";
import solutionRoute from "./routes/solutionRoutes.js";
import dashboardRoute from "./routes/dashboardRoute.js";
import helmet from "helmet";
import {limiter} from "./middleware/security.js";
dotenv.config();
const app = express();
app.use(cors(
 {  origin : process.env.FRONTEND_URL || "https://himalaya-neo-tech-nepal-afkvl4uhg-sumankarkii897s-projects.vercel.app",
   credentials : true,
   methods : ["GET","POST","PUT","DELETE"],
   allowedHeaders : ["Content-Type", "Authorization"]}

))

app.use(helmet())
app.use(limiter)

app.use(cookieParser())
app.use(express.json())

app.use("/api/v1/auth", authRoute)
app.use("/api/v1/solution", solutionRoute);
app.use("/api/v1/dashboard", dashboardRoute);
app.use(errorHandler);
app.get("/", (req,res)=> {
    res.send("Hello world")
})

const PORT = parseInt(process.env.PORT) || 8000;;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)

})
