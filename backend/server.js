import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cookieParser from 'cookie-parser';


import { envVars } from './utils/envVars.js';
import { connectDB } from './config/db.js';
import {authRoutes} from './routes/auth.routes.js';



const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());


dotenv.config({ path: path.resolve("./.env") });
const PORT=envVars.PORT||5000;


app.use('/api/v1/auth',authRoutes)


app.listen(PORT,()=>{
    console.log('server is running on port '+PORT);
    connectDB()
})

