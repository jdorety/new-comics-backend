const axios = require("axios");
const cheerio = require("cheerio");

const getCoverUrl = async diamondId => {
  try {
    // make an ajax call to the comic's display page
    const result = await axios.get(
      `https://previewsworld.com/Catalog/${diamondId}`
    );
    // return readable DOM object to find cover url
    return cheerio.load(result.data);
  } catch (err) {
    console.log(err);
  }
};

const addCover = async (url, diamondId) => {
  try {
    // get the url for the comic's display page
    const previewsPage = await getCoverUrl(diamondId);
    // using a DOM selector, identify the src attribute of the screenshot img element
    const imageEndpoint = previewsPage("#MainContentImage").attr().src;
    // create full url for cover url
    const imageUrl = `${url}${imageEndpoint}`;
    console.log(imageUrl);
    return imageUrl;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { addCover };
