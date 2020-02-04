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

    // // make GET request to Shortbox API current release week resource
    // const comics = await axios.get(`${URL}/comics/v1/new`);
    // if (comics) {
    //   let coverUrls = await getList();
    //   const newIds = [];
    //   for (comic of comics) {
    //     if (!coverUrls.includes(comic.diamond_id)) {
    //       let coverURL = await addCover(comic.diamond_id);
    //       console.log(coverUrls);
    //       newIds.push({ diamond_id: comic.diamond_id, url: coverURL });
    //     }
    //   }
    //   if (newIds.length) {
    //     await addToList(newIds);
    //     coverUrls = await getList();
    //   }
    //   //
    //   // for (comic of comics) {
    //   //   const imageSrc = await addCover("https://previewsworld.com",comic.diamond_id)
    //   //   comic.cover_url = imageSrc
    //   // }
    //   // responds with array of all current week releases
    //   res
    //     .status(200)
    //     .send({ comics: newComics.data.comics, covers: coverUrls });
    // } else {
    //   res.status(400).json({ message: "The API is down", comic: comics });
    // }
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
    const newComics = await getTheComics();
    console.log(newComics);
    let diamonds = await getList();
    diamonds = diamonds.map(diamond => {
      return diamond.diamond_id;
    });
    const noCovers = newComics.filter(comic => {
      return !diamonds.includes(comic.diamond_id);
    });
    if (noCovers.length) {
      for (no of noCovers) {
        const url = await addCover("https://previewsworld.com", no.diamond_id);
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
