const db = require("../dbConfig");

const getList = () => db.select().table("urls");

const addToList = list => db("urls").insert(list);

module.exports = {
  getList,
  addToList
};
