const { Op } = require("sequelize");
const { Resena } = require("../db");

// crear una reseña
async function crearResena(req, res, next) {
  let { UsuarioId, LibroId, titulo, descripcion, calificacion } = req.body;
  if (!UsuarioId || !LibroId || !titulo || !descripcion || !calificacion) {
    return res
      .status(404)
      .send("hace falta info para poder postear una reseña");
  }
  try {
    let nuevaResena = await Resena.create(req.body);
    res.send({success: "Hemos recibido tu reseña."});
  } catch (e) {
    res.status(404).send(e);
  }
}

// trae lista de resañas por id de usuario o por id de libro

async function resenasPorIDl(req, res) {
  let { LibroId, UsuarioId } = req.body;
  if (LibroId && !UsuarioId) {
    try {
      let reseñas = await Resena.findAll({
        where: {
          LibroId,
        },
      });
      res.send(reseñas);
    } catch (e) {
      res.status(404).send(e);
    }
  }
  if (UsuarioId && !LibroId) {
    try {
      let reseñas = await Resena.findAll({
        where: {
          UsuarioId,
        },
      });
      res.send(reseñas);
    } catch (e) {
      res.status(404).send(e);
    }
  }
  if (UsuarioId && LibroId) {
    res.status(404).send("solo puedes enviar un parametro o usuario o libro");
  }
  if (!UsuarioId && !LibroId) {
    res.status(404).send("falta de parametros");
  }
}

// trae cuantas denuncias tiene por id
async function denunciasId(req, res, next) {
  let { id } = req.body;
  try {
    let resena = await Resena.findByPk(id);
    if(!resena)return res.status(404).send('el id no existe')
    res.json({denuncias:resena.denuncias});
  } catch (e) {
    res.status(404).send(e);
  }
}

//aumenta las denuncias por id de resena
async function aumentoPorId(req, res, next) {
  let { id } = req.body;
  try {
    let resena = await Resena.findByPk(id);
    if(!resena)return res.status(404).send('el id no existe')
    let suma=resena.denuncias+1
    await Resena.update({denuncias:suma},{where:{id}})
    res.json({msj:"Thank you for your report!"})
  } catch (e) {
    res.status(404).send(e);
  }
}

//trae las reseñas que tienen denuncias 
async function resenasDenuncias(req,res,next){
  try{
    let resenas=await Resena.findAll({
        where:{
          denuncias:{
            [Op.gt]: 0
          }
        }
      })
    res.send(resenas)
  }catch(e){
    res.status(404).send(e)
  }
}
module.exports = { crearResena, resenasPorIDl,denunciasId,aumentoPorId,resenasDenuncias };
