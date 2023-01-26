const {Usuario} = require("../db");

async function signUp (req,res){
    let {nombre, email, clave}=req.body
    try{
        let nuevoU=Usuario.create({nombre,email,clave})
        res.send(`usuario con nombre ${nombre} fue creado con exito`)
    }catch(e){
        res.status(404).send(e)
    }

}


function signIn (req,res){
    res.send('signIn')
}

module.exports={
    signUp,
    signIn
}