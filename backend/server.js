import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors';



import { envVars } from './utils/envVars.js';
import { connectDB } from './config/db.js';
import {authRoutes} from './routes/auth.routes.js';
import {moviesRoutes} from './routes/movie.routes.js';
import { tvShowsRoutes } from './routes/tvshows.routes.js';
import { searchRoutes } from './routes/search.routes.js';
import { ProtectRoute } from './middleware/protectRoute.js';



const app=express();

app.use(cors({
  origin: ['http://localhost:5173'], // allow your frontend
  credentials: true, // if you're using cookies
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());




dotenv.config({ path: path.resolve('.env') });
const PORT=envVars.PORT||5000;


app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/movies',ProtectRoute,moviesRoutes)
app.use('/api/v1/tvshows',ProtectRoute,tvShowsRoutes)
app.use('/api/v1/search',ProtectRoute,searchRoutes)


app.listen(PORT,()=>{
    console.log('server is running on port '+PORT);
    connectDB()
})

