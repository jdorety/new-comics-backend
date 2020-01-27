const db = require("../dbConfig");

module.exports = {
  getPubList,
  getPubName,
  addPub
};

function getPubList() {
  return db.select().table("publisher");
}

function getPubName(name) {
  return db
    .select()
    .table("publisher")
    .where({ pub_name: name });
}

function addPub(name) {
  return db("publisher").insert({ pub_name: name });
}
