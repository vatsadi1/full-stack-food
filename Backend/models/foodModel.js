import mongoose  from "mongoose";


const foodschema = new mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    image:{type:String,required:true},
    category:{type:String,required:true}
})

const foodModel = mongoose.models.food || mongoose.model('food',foodschema)

export default foodModel




// explaination:

// ✅ Explanation of Every Line
// 1. import mongoose from "mongoose";

// You are importing Mongoose, which is a library that helps you:

// connect to MongoDB

// define schema (structure of documents)

// create models

// perform CRUD operations easily

// Mongoose makes MongoDB work like structured objects instead of random JSON.

// 2. const foodschema = new mongoose.Schema({...})

// You are creating a schema, which defines the structure of a food document.

// This tells MongoDB:

// Field	Type	Why required?
// name	String	Name of food must exist
// description	String	You need details
// price	Number	Food price must exist
// image	String	Image URL is required
// category	String	Food category (e.g., Pizza, Drinks)

// Schema ensures your data always follows rules instead of inserting random structure.

// 3. const foodModel = mongoose.models.food || mongoose.model('food', foodschema)

// This line creates a Model.

// ❓ What is a Model?

// A Model is a wrapper around the schema that allows you to do:

// foodModel.find()

// foodModel.findById()

// foodModel.create()

// foodModel.findByIdAndDelete()

// foodModel.updateOne()

// Basically, model = schema + functions to talk to MongoDB.

// ❓ Why use mongoose.models.food || ... ?

// Because in Next.js or Node with hot reload, the model may load again.
// This line prevents duplicate model errors.

// 4. export default foodModel

// You export the model so you can use it in your controller or routes.

// ❓ **Why do we use foodModel when deleting or finding food?

// Why not directly use MongoDB Atlas URL?**

// ⭐ Because you CANNOT perform CRUD operations directly on a MongoDB URL.

// MongoDB Atlas URL is only for:

// ✔ connecting to the database
// ❌ Not for inserting, deleting, or searching data directly
// ❌ URL cannot perform operations

// Example Atlas URL:

// mongodb+srv://user:pass@cluster.mongodb.net/foodDB


// This URL only connects to DB.
// It does NOT provide:

// validation

// methods (find, delete, update)

// schema rules

// error handling

// security checks

// 👍 What Mongoose does for you
// 🧠 Mongoose converts your JS code into MongoDB queries.

// Example:

// foodModel.find()


// Mongoose converts it into proper MongoDB query:

// db.foods.find({})


// You don’t need to write complex MongoDB queries manually.

// ❓ Can you work without Mongoose?

// YES, you can use the native MongoDB driver, but then you must do everything manually:

// No schema validation

// No default fields

// No model-based API

// You must connect manually

// You must write raw queries every time

// Example native delete (raw, long, difficult):

// const result = await client
//   .db("foodDB")
//   .collection("foods")
//   .deleteOne({ _id: new ObjectId(id) });


// So:

// ✔ Possible
// ❌ Not recommended
// ❌ More code
// ❌ More complex

// ⭐ Final Answer (Summary)

// Schema defines structure.

// Model gives you CRUD functions.

// You cannot delete/find items using only the MongoDB URL.

// Mongoose makes your work 5× easier with built-in functions.

// This is why you always use foodModel.find(), foodModel.delete(), etc.