const db = require("../dbConfig");

module.exports(getAll);

function getAll() {
  return db.select().table("book");
}
