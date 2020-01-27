const db = require("../dbConfig");

module.exports = { getAll, getByDiamondId, addBook, getAllDiamond };

function getAll() {
  return db.select().table("book");
}

function addBook(book) {
  return db("book").insert({ ...book });
}

function getByDiamondId(id) {
  return db("book")
    .select()
    .where({ diamond_id: id });
}

function getAllDiamond() {
  return db("book").select("diamond_id");
}
