import userModels from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";
import validator from "validator"


/*Mall ke andar alag-alag raste (routes) hote hain jo tumhe sahi jagah le jaate hain.

Express Router bhi bilkul waise hi kaam karta hai—
alag-alag URLs ko sahi handler (function) tak le jata hai.*/ 


//login user

const loginUser = async (req,res)=>{

    const {email,password} = req.body;

    try{
        //STEP 1 - Check karo kya user exist karta hai
        const user = await userModels.findOne({email});

        if(!user){
            return res.json({success:false,Message:"User not found"})
        }

        //STEP 2 - Password match karna
        // compare() function plaintext password ko hashed password se compare karta hai
        // compare() function true/false return karta hai
        // isMatch=true agar password match karte hain
        // isMatch=false agar password match nahi karte hain
        //compare funtion 2 arguments leta hai - plaintext password aur hashed password
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.json({success:false,Message:"Incorrect Password"})
        }

        //STEP 3 - Token create karna aur response bhejna
//Token login ke time isliye create hota hai kyunki token user ka digital ID card hota hai — jisse server ko baar-baar password verify nahi karna padta.
//User jab login karta hai → password check hota hai.

// Uske baad har API request me password nahi bhejna padta.

// Sirf token bhejna hota hai.

        const token = CreateToken (user._id)
        res.json({success:true,Message:"User Logged In Successfully",token})

}catch(error){
console.log(error)
res.json({success:false,Message:"Error in logging in user"})
}
}


//register user

//✅ STEP 0. Token banane ka function
//JWT → JSON Web Token
//.sign() = token generate karta hai.
//User ko identify karne ke liye ek unique token banate hain
//process.env = Environment Variables
//Yaha pe sensitive/secret cheeze rakhi jaati hain — jaise passwords, API keys, JWT secret, database link.
const CreateToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}


const registerUser = async(req,res)=>{
    // ⭐ STEP 1 — User ne form submit kiya → req.body se data aaya

    const {name,password,email} = req.body;
    try{
const exist = await userModels.findOne({email});
//⭐ STEP 2 — Check karo kya email already registered hai
if(exist){
    return res.json({success:false,Message:"User Already Exists"})
}
//⭐ STEP 3 — Email valid hai ya nahi?

if(!validator.isEmail(email)){
    return res.json({success:false,Message:"please enter a valid email"})
}

//⭐ STEP 4 — Password strong hai ya nahi?

if(password.length<8){
    return res.json({success:false,Message:"Please enter a strong password"})
}

// ⭐ STEP 5 — User ka password hash karna (Encrypt karna)

const salt = await bcrypt.genSalt(10)
const hashedpassword = await bcrypt.hash(password,salt)

// ⭐ STEP 6 — Naya User Banana 
const newUser = new userModels({
    name:name,
    email:email,
    password:hashedpassword,
})

//⭐ STEP 7 — User ko Database mein save karna
const user = await newUser.save();

//⭐ STEP 8 — Token create karna aur response bhejna
const token = CreateToken(user._id)
res.json({success:true,Message:"User Registered Successfully",token})

    }catch{
console.log(error)
res.json({success:false,Message:"Error in registering user"})
    }
}

export {loginUser,registerUser}