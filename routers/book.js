const express = require("express");

const { books } = require("../Data/books.js").infoBooks;

const orderby = require("../query/order.js");

const routerBook = express.Router();

// Middleware
routerBook.use(express.json());

routerBook.get("/", (req, res) => {
  if (req.query.orderby) {
    return res.send(JSON.stringify(orderby.order(req.query.orderby, books)));
  }
  res.send(JSON.stringify(books));
});

routerBook.get("/title/:title", (req, res) => {
  const title = req.params.title;
  const result = books.filter((books) =>
    books.title.toLowerCase().includes(title.toLowerCase())
  );

  if (result.length === 0) {
    return res.status(404).send(`No se encontró el libro ${title}.`);
  }

  if (req.query.orderby) {
    return res.send(JSON.stringify(orderby.order(req.query.orderby, result)));
  }

  res.send(JSON.stringify(result));
});

routerBook.get("/genre/:genre", (req, res) => {
  const genre = req.params.genre;
  const result = books.filter(
    (book) => book.genre.toLowerCase() === genre.toLowerCase()
  );

  if (result.length === 0) {
    return res.status(404).send(`No se encontraron libros de ${genre}.`);
  }

  if (req.query.orderby) {
    return res.send(JSON.stringify(orderby.order(req.query.orderby, result)));
  }

  res.send(JSON.stringify(result));
});

routerBook.get("/author/:author", (req, res) => {
  const author = req.params.author;
  const result = books.filter((book) =>
    book.author.toLowerCase().includes(author.toLowerCase())
  );

  if (result.length === 0) {
    console.log("JJJ");
    return res
      .status(404)
      .send(`No se encontraron libros del autor ${author}.`);
  }

  if (req.query.orderby) {
    return res.send(JSON.stringify(orderby.order(req.query.orderby, result)));
  }

  res.send(JSON.stringify(result));
});

routerBook.post("/", (req, res) => {
  let newBook = req.body;
  books.push(newBook);
  res.send(JSON.stringify(books));
});

routerBook.delete('/:id', (req, res) => {
  const id = req.params.id;
  const index = books.findIndex(book => book.id  == id);

  if (index >= 0 ) {
    books.splice(index, 1);
  }
  res.send(JSON.stringify(books));
});

module.exports = routerBook;
