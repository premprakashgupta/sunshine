const jwt=require("jsonwebtoken");
const UserSchema=require('../models/UserSchema');
exports.isAuth= async (req,res,next)=>{
    try {
        // const token=localStorage.getItem('token')
       const {token} = req.cookies;
    


    
        if(!token)
        {
            return res.status(401).json("login again")
        }
        const decodedData=jwt.verify(token,process.env.JWT_SECRET)
       
        req.userAllData=await UserSchema.findById(decodedData.id)
        
        next()
        
    } catch (error) {
        return res.status(401).json("login again")
    }
}