// const express = require("express");

const { Libro, Autor, Resena } = require("../db");
const { uploadImage } = require("../libraries/cloudinary");
const fs=require('fs-extra');


async function allBooks(req, res) {
  try {
    let bookInDb = await Libro.findAll({
      include: [
        {
          model: Autor,
          attributes: ["nombre"],
        },
        {
          model: Resena,
        },
      ],
    });
    if (bookInDb.length > 0) {
      return res.status(201).json({ status: "success", book: bookInDb });
    } else
      return res.status(404).json({ status: "error", msg: "No data found!" });
  } catch (error) {
    res.status(404).json(error);
  }
}

async function findBook(req, res) {
  const { id } = req.params;
  try {
    let bookSearch = await Libro.findByPk(id, {
      include: [
        {
          model: Autor,
          attributes: ["nombre"],
        },
        {
          model: Resena,
        },
      ],
    });
    return res.status(201).json(bookSearch);
  } catch (error) {
    res.status(404).json("Libro no encontrado");
  }
}

async function createBook(req, res) {

  let { name, autor, editorial, image, genero, stock, price } = req.body;

  let idAutor;
  let existe = await Autor.findAll({
    where: {
      nombre: autor,
    },
  });
  console.log("existe ", existe);
  if (existe.length > 0) {
    idAutor = existe[0].id;
  } else {
    try {
      let nuevoa = await Autor.create({ nombre: autor });
      idAutor = nuevoa.id;
    } catch (e) {
      res.status(404).send(e);
    }
  }
  try {
    console.log(`id de autor ${idAutor}`);
    const newBook = await Libro.create({
      name,
      AutorId: idAutor,
      editorial,
      image,
      genero,
      stock,
      price,
    });
    return res.status(201).send({ message: "Libro Creado", newBook });
  } catch (error) {
    res.status(500).json({
      message: "error, no se ha podido crear el libro",
      error,
    });
  }
}
async function deleteBook(req,res){
  const { id } = req.body;
  try{
    let cambiado=await Libro.update({estado:'desactivado'},{
        where:{id}
    })
    res.send(`el libro con id ${id} fue eliminado con exito`)
}catch(e){
    res.status(404).send(e)
}    
}
async function updateBook(req, res) {
  const { id } = req.params;
  let datos=req.body;
  if(req.files){
    let url =await uploadImage(req.files.image.tempFilePath);
    await fs.remove(req.files.image.tempFilePath)
    datos.image=url.secure_url;
  }
  try {
    let book = await Libro.findByPk(id);
    //aca va lo de los autores
    let updated = await book.update(datos,{where:{id}});
    res.status(200).json({ message: "Libro Actualizado", updated });
  } catch (error) {
    res
      .status(401)
      .json({ message: "No se ha podido actualizar el libro", error });
  }
}

//traer los libros ordenados
async function ordenAlfabetico(req, res) {
  try {
    const bookInDb = await Libro.findAll();

    if (bookInDb.length > 0) {
      orden = bookInDb.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
      return res.status(201).json({ status: "success", book: orden });
    } else {
      return res.status(404).json({ status: "error", msg: "No data found!" });
    }
  } catch (error) {
    res.status(404).json(error);
  }
}

async function createBookc(req, res) {
  let { name, autor, editorial, image, genero, stock, price } = req.body;
  let idAutor;
  let existe = await Autor.findAll({
    where: {
      nombre: autor,
    },
  });
  if (existe.length > 0) {
    idAutor = existe[0].id;
  } else {
    try {
      let nuevoa = await Autor.create({ nombre: autor });
      idAutor = nuevoa.id;
    } catch (e) {
      res.status(404).send(e);
    }
  }
  if(!image){
    let{imageF}=req.files
    const url=await uploadImage(imageF.tempFilePath);
    await fs.remove(req.files.imageF.tempFilePath)
    image=url.secure_url
  }
  try {
    const newBook = await Libro.create({
      name,
      AutorId: idAutor,
      editorial,
      image,
      genero,
      stock,
      price,
    });
    return res.status(201).send({ message: "Libro Creado", newBook });
  } catch (error) {
    res.status(500).json({
      message: "error, no se ha podido crear el libro",
      error,
    });
  }
}
module.exports = {
  createBook,
  allBooks,
  updateBook,
  findBook,
  ordenAlfabetico,
  deleteBook,
  createBookc 
};
