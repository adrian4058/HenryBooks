const {Usuario} = require("../db");
const jwt =require('jsonwebtoken');
async function signUp (req,res){
    let {nombre, email, password,rol,estado}=req.body
    const existe = await Usuario.findOne({ where: {nombre} });
    if(existe){
        return res.status(404).send(`el usuarios con nombre ${nombre} ya existe`)
    }
    try{
        let nuevoU= await Usuario.create({nombre,email,password,rol,estado})
        const token=jwt.sign({id:nuevoU.id},'henribooks',{
            expiresIn:86400//24 horas
        })
        res.json({token})
    }catch(e){
        res.status(404).send(e)
    }
}


async function signIn (req,res){
    let {email,password}=req.body
    let encontrarUsuario = await Usuario.findOne({ where: {email} });
    if(!encontrarUsuario){
        return res.status(404).json({message:"User not found"})
    }
    console.log(encontrarUsuario.password)
    if(password!=encontrarUsuario.password){
        return res.status(404).json({message:"password not have coincidence"})
    }

    const token =jwt.sign({id:encontrarUsuario.id},'henribooks',{
            expiresIn:86400//24 horas
        })
    res.json({token})
}

module.exports={
    signUp,
    signIn
}