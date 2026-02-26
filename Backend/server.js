import express from 'express';
import cors from 'cors';   
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import 'dotenv/config'
import userRouter from './routes/userRoute.js';
// app config

const app = express();
const port = 4000;

// miiddleware
app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
    res.send("API Working")});


    //bd connection
    connectDB()

    //Api endpoint
    app.use('/api/food',foodRouter)

    app.use('/api/user',userRouter)
    

    //api to serve images statically
    app.use('/images',express.static('uploads'))

// listen
app.listen(port, () => console.log(`Listening on localhost: ${port}`));


//mongodb+srv://vatsaditya:ad1tya123@cluster0.igbpbwj.mongodb.net/?