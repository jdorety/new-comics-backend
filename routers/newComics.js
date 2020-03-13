const express = require("express");
const axios = require("axios");

const { getList, addToList } = require("../data/helpers/url");
const { addCover } = require("../scraper");

const router = express.Router();

const API = process.env.API; // Shortbox API root URL

const getTheComics = async () => {
  try {
    // contact the three api endpoints
    // const prevComics = await axios.get(`${API}/comics/v1/previous`);
    const newComics = await axios.get(`${API}/comics/v1/new`);
    // const nextComics = await axios.get(`${URL}/comics/v1/future`);
    // package all the books in one array and kick it out

    return newComics.data.comics;
  } catch (err) {
    console.log(err);
  }
};

// gets new comics for current week
router.get("/", async (req, res) => {
  try {
    // get comics from shortboxed
    const newComics = await getTheComics();
    // get list of cover url's
    const covers = await getList();
    res.status(200).json({ comics: newComics, covers });

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

router.get("/all", async (req, res) => {
  try {
    const allBooks = await book.getAll();
    res.status(200).json(allBooks);
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }
});

router.post("/scrape", async (req, res) => {
  try {
    // get new comics list
    const newComics = await getTheComics();
    console.log(newComics);
    // get list of all diamond id's and their associated cover urls
    let diamonds = await getList();
    // convert list to only diamond id's
    diamonds = diamonds.map(diamond => {
      return diamond.diamond_id;
    });
    // filter out all diamond id's with no associated cover url
    const noCovers = newComics.filter(comic => {
      return !diamonds.includes(comic.diamond_id);
    });
    // check if there are diamond_id's with no covers
    if (noCovers.length) {
      for (no of noCovers) {
        // get url for cover image from previewsworld
        const url = await addCover("https://previewsworld.com", no.diamond_id);
        // add cover url to list
        await addToList({ url, diamond_id: no.diamond_id });
      }
      res.status(201).json({ message: "Scraped!" });
    } else {
      res.status(200).json({ message: "Already scraped!" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }
});

module.exports = router;
