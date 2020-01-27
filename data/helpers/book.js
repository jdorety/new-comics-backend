const db = require("../dbConfig");

module.exports = {
  getPubList
};

async function getPubList() {
  try {
    const pubList = await db.select().table("book");
    if (pubList) {
      return pubList;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
}
