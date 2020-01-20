const express = require("express");
// const cors = require("cors");
const helmet = require("helmet");
const axios = require("axios");

const server = express();

server.use(express.json());
server.use(helmet());
// server.use(cors());
server.get("/comics", async (req, res) => {
  const API = process.env.API;
  const newComics = await axios.get(`${API}/comics/v1/new/`);
  console.log(newComics);
});

module.exports = server;