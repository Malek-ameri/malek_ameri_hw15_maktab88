const { fileLoader } = require("ejs");
const express = require("express");
const app = express();
const data = require("./db/products-data.json");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/home", (req, res) => {
  res.render("home", { data });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});
app.post("/search", (req, res) => {
  const { search } = req.body;
  const searchResult = data.filter(
    (item) =>
      item.model == search ||
      item.price == search ||
      item.brand == search ||
      item.screen == search ||
      item.ram == search ||
      item.hard == search ||
      item.cpuCreator == search ||
      item.cpuSeries == search ||
      item.weight == search
  );

  res.render("search",{searchResult});
});

app.get("/product/:id", (req, res) => {
  const { id } = req.params;
  const productSelected = data.find((item) => item.id === +id);
  res.render("productinfo", productSelected);
});

app.listen(3000, () => {
  console.log("sever is on port 3000....");
});
