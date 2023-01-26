const jwt =require('jsonwebtoken')
const {Usuario} = require("../db");
const verifyToken =async (req,res,next)=>{
    try{
        const token=req.headers["x-access-token"]
        console.log(token)
        
        if(!token)return res.status(403).json({message:"no token provided"})
        
        const decoded=jwt.verify(token,'henribooks')
        
        const user=await Usuario.findByPk(decoded.id)
        if(!user) return res.status(404).json({message:'not user found'})
        next()
    }catch(e){
        res.status(404).json({message:"sin autorizacion"})
    }
}
module.exports=verifyToken