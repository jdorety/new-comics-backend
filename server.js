const express = require("express");
// const cors = require("cors");
const helmet = require("helmet");
const logger = require("morgan");

const server = express();
const newComics = require("./routers/newComics");

server.use(express.json());
server.use(logger("short"));
server.use(helmet());
// server.use(cors());
server.use("/newcomics", newComics);

module.exports = server;
