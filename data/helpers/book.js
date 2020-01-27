const db = require("../dbConfig");

module.exports(getAll, addBook);

function getAll() {
  return db.select().table("book");
}

function addBook(book) {
  return db("book").insert({
    title: book.title,
    publisher_id: book.publisher_id,
    description: book.description,
    creators: book.creators,
    price: book.price,
    release_date: book.release_date,
    diamond_id: book.diamond_id
  });
}
