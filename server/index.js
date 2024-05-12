import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./database.js";
import cookieParser from "cookie-parser";

//Routes import
import postRoute from "./routes/post.js"
import userRoute from "./routes/user.js"
const app = express();

dotenv.config({
    path:"./.env",

});



app.get("/",(req,res) =>{
     res.send("Hello Guyzzz");
});

const port = process.env.PORT || 3000
const envMode = process.env.NODE_ENV.trim() || "PRODUCTION"
const mongoUri= process.env.MONGO_URI;


// Database 
connectDB(mongoUri);


// Using Middlewares
  app.use(express.json());
  app.use(express.urlencoded({extended :true}));
  app.use(cookieParser());


// Routes
  app.use('/api/v1',postRoute);
  app.use('/api/v1/user',userRoute);


app.listen(port,()=>{
    console.log(`Server is running on ${port} in ${envMode} Mode`);
});