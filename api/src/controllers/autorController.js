const { Autor } = require("../db");

//traer todos los autores
async function autores(req, res) {
  try {
    let autores = await Autor.findAll();
    console.log(autores);
    if (autores.length > 0) return res.json(autores);
    res.send(`la lista de autores esta vacia`);
  } catch (e) {
    res.status(404).send(`${e}`);
  }
}

//crear un autor
async function crearAutor(req, res) {
  let { nombre } = req.body;
  try {
    if (!nombre) {
      res.status(404).send("datos incompletos");
    } else {
      let nuevo = await Autor.create({ nombre });
      console.log(nuevo);
      res.send(`el autor con nombre ${nombre} fue creado correctamente`);
    }
  } catch (e) {
    res.status(404).send(e);
  }
}
//eliminar un autor

async function eliminarAutor (req,res){
    let {id}=req.body
    try{
        let cambiado=await Autor.update({estado:'desactivado'},{
            where:{id}
        })
        res.send(`el autor con id ${id} fue modificado con exito`)
    }catch(e){
        res.status(404).send(e)
    }    
}

//EDITAR AUTOR POR ID
async function editarAutor(req, res) {
  let { nombre, fechaNacimiento, lugarNacimiento, id } = req.body;
  try {
    let cambiado = await Autor.update(
      { nombre, fechaNacimiento, lugarNacimiento },
      {
        where: { id },
      }
    );
    res.send(`el autor con id ${id} fue modificado con exito`);
  } catch (e) {
    res.status(404).send(e);
  }
}

//traer autor por id

async function autorId(req, res) {
  let { idAutor } = req.params;
  try {
    let autor = await Autor.findByPk(idAutor);
    res.json(autor);
  } catch (e) {
    res.status(404).send(e);
  }
}

module.exports = { autorId, editarAutor, eliminarAutor, crearAutor, autores };
