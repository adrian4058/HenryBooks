const { Usuario } = require("../db");
const jwt = require("jsonwebtoken");
const { transporter } = require("../middleware/mail");
const path = require("path");
const filepath = path.join(__dirname, "../public/registerMail.html");
const { Email } = process.env;

async function signUp(req, res) {
  let { nombre, email, password, rol, estado, img } = req.body;
  console.log(req.body);
  let existe = await Usuario.findOne({ where: { nombre } });
  if (existe) {
    return res
      .status(400)
      .send({ msj: `User with name: ${nombre} already exists!` });
  }
  existe = await Usuario.findOne({ where: { email } });
  if (existe) {
    return res.status(400).send({ msj: `E-mail: ${email} already registered` });
  }
  try {
    let nuevoU = await Usuario.create({ nombre, email, password, rol, estado, img });
    const token = jwt.sign({ id: nuevoU.id }, "henribooks", {
      expiresIn: 86400, // 24 horas
    });
     // const send = await transporter.sendMail({
    //   from: `${Email}`, // sender address
    //   to: email, // list of receivers
    //   subject: "Registro Exitoso", // Subject line
    //   html: { path: filepath }, // html body
    // });
    res.json({ token, usuario: nuevoU });
  } catch (e) {
    res.status(400).send(e);
  }
}



async function signIn(req, res) {
  let { email, password } = req.body;
  let encontrarUsuario = await Usuario.findOne({ where: { email } });
  if (!encontrarUsuario) {
    return res.status(404).json({ message: "User not found" });
  }
  console.log(encontrarUsuario.password);
  if (password != encontrarUsuario.password) {
    return res.status(404).json({ message: "Wrong password" });
  }
  if (encontrarUsuario.estado == "desactivado") {
    return res.status(404).json({ message: "User not found...." });
  }
  const token = jwt.sign({ id: encontrarUsuario.id }, "henribooks", {
    expiresIn: 86400, //24 horas
  });
  const usuarioDatos = await Usuario.findByPk(encontrarUsuario.id);

  res.json({ token, usuario: usuarioDatos });
}

module.exports = {
  signUp,
  signIn,
};
