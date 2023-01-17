const { Router} = require("express");
const {Autor} = require("../db");

const router = Router();

//traer todos los autores
router.get('/',async (req,res)=>{
    try{
        let autores=await Autor.findAll();
        console.log(autores)
        if(autores.length>0)return res.json(autores)
        res.send(`la lista de autores esta vacia`)
    }catch(e){
        res.status(404).send(`${e}`)
    }
})

//crear un autor
router.post('/',async(req,res)=>{
    let {nombre,fechaNacimiento,lugarNacimiento}=req.body;
    try{
        if(!nombre || !fechaNacimiento || !lugarNacimiento){
            res.status(404).send("datos incompletos")
        }else{
            let nuevo = await Autor.create({nombre,fechaNacimiento,lugarNacimiento})
            console.log(nuevo)
            res.send(`el autor con nombre ${nombre} fue creado correctamente`)
        }
    }catch(e){
        res.status(404).send(e)
    }
})

//eliminar un autor
router.delete('/',async(req,res)=>{
    let {id}=req.body
    try{
        let borrar=await Autor.destroy({
            where:{
                id
            }
        })
        res.send(`el autor con id ${id} fue borrado correctamente`);
    }catch(e){
        res.status(404).send(e)
    }
})

//EDITAR AUTOR POR ID

router.put('/',async(req,res)=>{
    let {nombre,fechaNacimiento,lugarNacimiento,id}=req.body;
    try{
        let cambiado=await Autor.update({nombre,fechaNacimiento,lugarNacimiento},{
            where:{id}
        })
        res.send(`el autor con id ${id} fue modificado con exito`)
    }catch(e){
        res.status(404).send(e)
    }    
})

//traer autor por id 

router.get('/:idAutor',async(req,res)=>{
    let {idAutor}=req.params;
    try{
        let autor= await Autor.findByPk(idAutor)
        res.json(autor)
    }catch(e){
        res.status(404).send(e)
    }
})

module.exports=router