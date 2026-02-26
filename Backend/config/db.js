import mongoose from "mongoose";

export const connectDB = async ()=>{
    (await mongoose.connect('mongodb+srv://vatsaditya:ad1tya123@cluster0.igbpbwj.mongodb.net/foodsy-project').then(()=>console.log('Db connected'))

)
console.log("MONGO_URI 👉", process.env.MONGO_URI);
}