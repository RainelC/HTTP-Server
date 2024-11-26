const express = require("express");

const { comics } = require("../Data/books.js").infoBooks;

const orderby = require("../query/order.js");

const routerComic = express.Router();

// Middleware
routerComic.use(express.json());

routerComic.get("/", (req, res) => {
  if (req.query.orderby) {
    return res.send(JSON.stringify(orderby.order(req.query.orderby, comics)));
  }
  res.send(JSON.stringify(comics));
});

routerComic.get("/title/:title", (req, res) => {
  const title = req.params.title;
  const result = comics.filter((comics) =>
    comics.title.toLowerCase().includes(title.toLowerCase())
  );

  if (result.length === 0) {
    return res.status(404).send(`No se encontró el comics ${title}.`);
  }

  if (req.query.orderby) {
    return res.send(JSON.stringify(orderby.order(req.query.orderby, result)));
  }

  res.send(JSON.stringify(result));
});

routerComic.get("/author/:author", (req, res) => {
  const author = req.params.author;
  const result = comics.filter((comics) =>
    comics.author.toLowerCase().includes(author.toLowerCase())
  );

  if (result.length === 0) {
    return res
      .status(404)
      .send(`No se encontraron comics del autor ${author}.`);
  }

  if (req.query.orderby) {
    return res.send(JSON.stringify(orderby.order(req.query.orderby, result)));
  }

  res.send(JSON.stringify(result));
});

routerComic.get("/illustrator/:illustrator", (req, res) => {
  const illustrator = req.params.illustrator;
  const result = comics.filter((comics) =>
    comics.illustrator.toLowerCase().includes(illustrator.toLowerCase())
  );

  if (result.length === 0) {
    return res
      .status(404)
      .send(`No se encontraron comics del illustrator ${title}.`);
  }

  if (req.query.orderby) {
    return res.send(JSON.stringify(orderby.order(req.query.orderby, result)));
  }

  res.send(JSON.stringify(result));
});

routerComic.get("/genre/:genre", (req, res) => {
  const genre = req.params.genre;
  const result = comics.filter(
    (comics) => comics.genre.toLowerCase() === genre.toLowerCase()
  );

  if (result.length === 0) {
    return res.status(404).send(`No se encontraron comics de ${genre}.`);
  }

  if (req.query.orderby) {
    return res.send(JSON.stringify(orderby.order(req.query.orderby, result)));
  }

  res.send(JSON.stringify(result));
});

routerComic.delete('/:id', (req, res) => {
  const id = req.params.id;
  const index = comics.findIndex(comic => comic.id == id);

  if (index >= 0) {
    comics.splice(index, 1);
  }
  res.send(JSON.stringify(comics));
});

module.exports = routerComic;
