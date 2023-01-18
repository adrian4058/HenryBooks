const express = require("express");
const { Libro } = require("../db");

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

module.exports = { createBook };
