const {Usuario}=require('../db')

//traer usuarios
async function getUsuarios(req,res,next){
    try{
        let usuarios=await Usuario.findAll();
        if(usuarios.length>0){
            return res.json({status:'succes',usuarios})
        }else{
            return res.status(404).json({status:'error',msj:'no data found!'})
        }
    }catch(e){
        res.status(404).json(e)
    }
}

module.exports={
    getUsuarios
}