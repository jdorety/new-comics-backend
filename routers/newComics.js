const express = require("express");
const axios = require("axios");

const router = express.Router();

const API = process.env.API; // Shortbox API root URL

// gets new comics for current week
router.get("/", async (req, res) => {
  try {
    // make GET request to Shortbox API current release week resource
    const newComics = await axios.get(`${API}/comics/v1/new`);
    console.log(newComics);
    // responds with array of all current week releases
    res.status(200).send({ comics: newComics.data.comics });
  } catch (err) {
    console.log(err);
    // respond with general error
    res.status(500).send(err);
  }
});

// gets new comics for previous week
router.get("/previous", async (req, res) => {
  try {
    const newComics = await axios.get(`${API}/comics/v1/previous`);
    res.status(200).send({ comics: newComics.data.comics });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});



module.exports = router;
