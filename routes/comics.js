const express = require("express");
const router = express.Router();

const axios = require("axios");

// ROUTE POUR RECUPERER LA LISTE DES COMICS
router.get("/comics", async (req, res) => {
  try {
    const title = req.query.title || "";
    let limit = 5;
    let page = req.query.page;
    // let skip = req.query.skip || 0;
    let skip = (page - 1) * limit;

    if (!page) {
      // Forcer à afficher la première page
      page = 1;
    }
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?title=${title}&limit=${limit}&skip=${skip}&page=${page}&apiKey=${process.env.MARVEL_API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ROUTE POUR RECUPERER LA LISTE DES COMICS PAR PERSONNAGE

router.get("/comics/:characterId", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${req.params.characterId}?apiKey=${process.env.MARVEL_API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
