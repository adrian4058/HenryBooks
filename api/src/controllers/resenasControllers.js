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
    let nuevaReseña = await Resena.create(req.body);
    res.send(nuevaReseña);
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
//eliminar una reseña

module.exports = { crearResena, resenasPorIDl };
