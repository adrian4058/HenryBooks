// const express = require("express");
const { Libro } = require("../db");

async function allBooks(req, res) {
  try {
    const bookInDb = await Libro.findAll();

    if (bookInDb.length > 0)
      return res.status(201).json({ status: "success", book: bookInDb });
    else
      return res.status(404).json({ status: "error", msg: "No data found!" });
  } catch (error) {
    res.status(404).json(error);
  }
}

async function findBook(req, res) {
  const { id } = req.params;
  try {
    let bookSearch = await Libro.findByPk(id);
    //aca va lo del autor
    return res.status(201).json(bookSearch);
  } catch (error) {
    res.status(404).json("Libro no encontrado");
  }
}

async function createBook(req, res) {
  let { name, autor, editorial, reviews, image, genero, stock, price } =
    req.body;
  try {
    const newBook = await Libro.create({
      name,
      autor,
      editorial,
      reviews,
      image,
      genero,
      stock,
      price,
    });
    return res.status(201).send(newBook);
  } catch (error) {
    res.status(500).json({
      status: "error, no se ha podido crear el libro",
      messagge: error,
    });
  }
}

async function updateBook(req, res) {
  const { id } = req.params;
  const { name, autor, editorial, reviews, image, genero, stock, price } =
    req.body;
  try {
    let book = await Libro.findByPk(id);
    //aca va lo de los autores
    let updated = await book.update({
      name: name,
      autor: autor,
      editorial: editorial,
      reviews: reviews,
      image: image,
      genero: genero,
      stock: stock,
      price: price,
    });
    res.status(200).json({ message: "Libro Actualizado", updated });
  } catch (error) {
    res
      .status(401)
      .json({ message: "No se ha podido actualizar el libro", error });
  }
}

module.exports = { createBook, allBooks, updateBook, findBook };
