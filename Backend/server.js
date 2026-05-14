import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import cors from 'cors';   
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
 import CartRouter from "./routes/cartRouter.js";
import userRouter from './routes/userRoute.js';
import orderRouter from "./routes/orderRouter.js";
 
// app config

const app = express();
const port = 4000;

// miiddleware
app.use(express.json());
app.use(
  cors({
    origin: [
       "http://localhost:5173",
        "http://localhost:5174",
      "https://adminfoodsy.netlify.app",
      "https://foodsyweb.netlify.app"
    ],
    credentials: true
  })
);

app.get('/', (req, res) => {
    res.send("API Working")});


    //bd connection
    connectDB()

    //Api endpoint
    app.use('/api/food',foodRouter)

    app.use('/api/user',userRouter)
    
  app.use('/api/cart',CartRouter)

  app.use('/api/order',orderRouter)

    //api to serve images statically
    app.use('/images',express.static('uploads'))

// listen
app.listen(port, () => console.log(`Listening on localhost: ${port}`));


//mongodb+srv://vatsaditya:ad1tya123@cluster0.igbpbwj.mongodb.net/?