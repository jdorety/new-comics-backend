const db = require("../dbConfig");

module.exports = { getAll, getByDiamondId, addBook };

function getAll() {
  return db.select().table("book");
}

function getByDiamondId(id) {
  return db("book")
    .select()
    .where({ diamond_id: id });
}

function addBook(book) {
  return db("book").insert({ ...book });
}
