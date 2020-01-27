const express = require("express");
const axios = require("axios");

const router = express.Router();

const book = require("../data/helpers/book");
const pub = require("../data/helpers/publisher");
const { addCover } = require("../scraper");

const API = process.env.API; // Shortbox API root URL

// async function checkDb(id) {
//   const
// }

//creates an object that allows quick lookup of publisher id's
function makePubsObj(arr) {
  let obj = {};
  for (let i of arr) {
    obj[i.pub_name] = i.id;
  }
  return obj;
}

// this creates a correctly shaped object to pass to the book db helper
async function packageBook(book, pubList) {
  //gets cover image url with web scraper method
  const cover = await addCover("https://previewsworld.com", book.diamond_id);
  const bookRecord = {
    title: book.title,
    description: book.description,
    publisher_id: pubList[book.publisher],
    creators: book.creators,
    price: book.price,
    release_date: book.release_date,
    cover_url: cover,
    diamond_id: book.diamond_id
  };
  return bookRecord;
}
// will compare diamond_id of book against provided list of diamond_ids
// returns true or false depending on existence or not
function checkBookExists(book, idList) {
  const { diamond_id } = book;
  return idList.includes(diamond_id);
}

// retrieve new comics array from API
// iterate through comics, checking if publisher in stored publishers object
// if they aren't, add that publisher to "publisher" table
// after iterating, refresh stored publisher object from db
// iterate through comics list, checking if book exists in db
// if not, insert book

router.get("/", async (req, res) => {
  try {
    // get publishers id list from db
    const storedPubs = await pub.getPubList();

    // create object with stored publishers names as keys, id's as values
    let pubsIds = makePubsObj(storedPubs);

    // create array of all diamond_id's in "book" table
    const allBooksIds = await book.getAllDiamond();
    const diamond_ids = allBooksIds.map(id => id["diamond_id"]);
    console.log(diamond_ids);

    // get book list from API
    const prevBooks = await axios.get(`${API}/comics/v1/previous`);
    const currentBooks = await axios.get(`${API}/comics/v1/new`);
    const futureBooks = await axios.get(`${API}/comics/v1/future`);
    const newBooks = [
      ...prevBooks.data.comics,
      ...currentBooks.data.comics,
      ...futureBooks.data.comics
    ];

    // iterate through books, checking if they're in our db already
    for (let newBook of newBooks) {
      if (!checkBookExists(newBook, diamond_ids)) {
        // if the book is not in our db, create a new record
        let packedBook = await packageBook(newBook, pubsIds);
        await book.addBook(packedBook);
      } else {
        console.log("it's already there");
      }
    }
    // console.log(newBooks);
    res.status(200).send(newBooks);
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }
});

module.exports = router;
