const asyncHandler = require("express-async-handler");
const Book = require("../models/bookModel");

const uploadBook = asyncHandler(async (req, res) => {
  console.log(req.files.pdf.name);
  //res.send(req.body);
  console.log(req.file.name);
  const pdf = req.files.pdf.name;
  const book = await Book.create({
    title: req.body.title,
    category: req.bodycategory,
    description: req.body.description,
    pdf: pdf,
  });

  res.json(book);
});

const getBooks = asyncHandler(async (req, res) => {
  const books = await Book.find();
  res.json({ length: books.length, books });
});

module.exports = {
  uploadBook,
  getBooks,
};
