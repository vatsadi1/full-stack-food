import jwt from "jsonwebtoken"

const authMiddleware = async (req,res,next)=>{

  
    const {token} = req.headers
 
    if(!token){
        return res.json({success:false,message:"Not Authorized"})
    }

    try{

        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        
        req.user = decoded;
        console.log("Decoded:",decoded)

        console.log("Decoded Token:", decoded)
console.log("UserId:", decoded.id)
 
        next()

    }catch(error){
        console.log(error)
        res.json({success:false,message:"Invalid Token"})
    }
 
}

export default authMiddleware