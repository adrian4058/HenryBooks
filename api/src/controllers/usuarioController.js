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

//traer usuarios por id 
async function getUsuarioById(req,res,next){
    const {id}=req.params;
    try{
        let usuario=await Usuario.findByPk(id)
        if(usuario==null){
            return res.status(404).json({msj:`èl usuario con id ${id} no existe`})
        }
        res.status(202).json({usuario})
    }catch(e){
        res.status(404).json(e)
    }
}

//editar usuario
async function editUsuario(req,res,next){
    const{id}=req.params;
    const{nombre,email,passworx,rol,estado,direccion,pais,ciudad,img}=req.body
    try{
        let usuario=await Usuario.findByPk(id)
        if(usuario==null){
            return res.status(404).json({msj:`èl usuario con id ${id} no existe`})
        }
        let actualizado = await Usuario.update(req.body,{where:{id}})
        // let updated = await Usuario.update({nombre,email,passworx,rol,estado,direccion,pais,ciudad,img})
        res.status(200).json({message:`usuario actualizado`})
    }catch(e){
        res.status(404).json(e)
    }
}

//

module.exports={
    getUsuarios,
    getUsuarioById,
    editUsuario
}