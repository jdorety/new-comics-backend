const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const router = express.Router();

const API = process.env.API; // Shortbox API root URL


const getCoverUrl = async diamondId => {
  try {
    const result = await axios.get(
      `https://previewsworld.com/Catalog/${diamondId}`
    );
    return cheerio.load(result.data);
  } catch (err) {
    console.log(err);
  }
};

const addCover = async (url, diamondId) => {
  try {
    const previewsPage = await getCoverUrl(diamondId);
    const imageEndpoint = previewsPage("#MainContentImage").attr().src
    const imageUrl = `${url}${imageEndpoint}`
    console.log(imageUrl);
    return imageUrl;
  } catch (err) {
    console.log(err)
  }
}



// gets new comics for current week
router.get("/", async (req, res) => {
  try {
    // make GET request to Shortbox API current release week resource
    const newComics = await axios.get(`${API}/comics/v1/new`);
    const { comics } = newComics.data;
    for (comic of comics) {
      const imageSrc = await addCover("https://previewsworld.com",comic.diamond_id)
      comic.cover_url = imageSrc
    }
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

// gets new comics for next week
router.get("/future", async (req, res) => {
  try {
    const newComics = await axios.get(`${API}/comics/v1/future`);
    res.status(200).send({ comics: newComics.data.comics });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

module.exports = router;
