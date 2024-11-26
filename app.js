const express = require("express");
const app = express();

const { infoBooks } = require("./Data/books.js");

// Routers

const routerBook = require("./routers/book.js");
app.use("/api/library/books", routerBook);

const routerComic = require("./routers/comic.js");
app.use("/api/library/comics", routerComic);

const routerMagazine = require("./routers/magazine.js");
app.use("/api/library/magazines", routerMagazine);

// Routing

app.get("/", (req, res) => {
  res.send("API sobre libros");
});

app.get("/api/library", (req, res) => {
  res.send(JSON.stringify(infoBooks));
});

// Port

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("El servidor está corriendo");
});
