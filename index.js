const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

const axios = require("axios");

// IMPORT DE MES FICHIERS DE ROUTES
const comicsRoutes = require("./routes/comics");
const personnagesRoutes = require("./routes/personnages");

// JE DEMANDE A MON SERVEUR D'UTILISER MES ROUTES
app.use(comicsRoutes);
app.use(personnagesRoutes);

app.all("*", (req, res) => {
  res.status(400).json({ message: "Cette route marvel n'existe pas" });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started");
});
