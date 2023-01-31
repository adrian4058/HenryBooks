const jwt =require('jsonwebtoken')
const {Usuario,Rol} = require("../db");
const verifyToken =async (req,res,next)=>{
    try{
        const token=req.headers["x-access-token"]
        console.log(token)
        
        if(!token)return res.status(403).json({message:"no token provided"})
        
        const decoded=jwt.verify(token,'henribooks')
        req.userId=decoded.id

        const user=await Usuario.findByPk(req.userId)
        
        if(!user) return res.status(404).json({message:'not user found'})
        
        next()
    }catch(e){
        res.status(404).json({message:"sin autorizacion"})
    }
}


const isAdmin =async (req,res,next)=>{
    const user=await Usuario.findByPk(req.userId) 
    if(user.rol=='user'){
        return res.status(404).json({message:"rol de usuario no permite entrar a esta ruta"})
    }
    next()
}

module.exports={verifyToken,isAdmin}
