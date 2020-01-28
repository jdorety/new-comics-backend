const db = require("../dbConfig");

module.exports = {
  getList,
  addToList
};

const getList = () => db.select().table("urls");

const addToList = list => db("urls").insert(...list);
