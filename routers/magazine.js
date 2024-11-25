const express = require("express");

const { magazines } = require("../Data/books.js").infoBooks;
const orderby = require("../query/order.js");

const routerMagazine = express.Router();

// Middleware
routerMagazine.use(express.json());

routerMagazine.get("/", (req, res) => {
  res.send(JSON.stringify(magazines));
});

routerMagazine.get("/title/:title", (req, res) => {
  const title = req.params.title;
  const result = magazines.filter((magazines) =>
    magazines.title.toLowerCase().includes(title.toLowerCase())
  );

  if (result.length === 0) {
    return res.status(404).send(`No se encontro la revista ${title}.`);
  }

  if (req.query.orderby) {
    return res.send(JSON.stringify(orderby.order(req.query.orderby, result)));
  }

  res.send(JSON.stringify(result));
});

routerMagazine.get("/genre/:genre", (req, res) => {
  const genre = req.params.genre;
  const result = magazines.filter(
    (magazines) => magazines.genre.toLowerCase() === genre.toLowerCase()
  );

  if (result.length === 0) {
    return res.status(404).send(`No se encontraron revistas de ${genre}.`);
  }

  if (req.query.orderby) {
    return res.send(JSON.stringify(orderby.order(req.query.orderby, result)));
  }

  res.send(JSON.stringify(result));
});

routerMagazine.get("/issue/:issue", (req, res) => {
  const issue = req.params.issue;
  const result = magazines.filter((magazines) =>
    magazines.issue.toLowerCase().includes(issue.toLowerCase())
  );

  if (result.length === 0) {
    return res
      .status(404)
      .send(`No se encontron la revistas edición ${issue}.`);
  }

  if (req.query.orderby) {
    return res.send(JSON.stringify(orderby.order(req.query.orderby, result)));
  }

  res.send(JSON.stringify(result));
});

module.exports = routerMagazine;
