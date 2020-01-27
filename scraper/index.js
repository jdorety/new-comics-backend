const getCoverUrl = async diamondId => {
  try {
    const result = await axios.get(
      `https://previewsworld.com/Catalog/${diamondId}`
    );
    return cheerio.load(result.data);
  } catch (err) {
    console.log(err);
  }
};

export default addCover = async (url, diamondId) => {
  try {
    const previewsPage = await getCoverUrl(diamondId);
    const imageEndpoint = previewsPage("#MainContentImage").attr().src;
    const imageUrl = `${url}${imageEndpoint}`;
    console.log(imageUrl);
    return imageUrl;
  } catch (err) {
    console.log(err);
  }
};
