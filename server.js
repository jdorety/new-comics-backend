const express = require("express");
// const cors = require("cors");
const helmet = require("helmet");
const logger = require("morgan");

const server = express();
const newComics = require("./routers/newComics");
const testRouter = require("./routers/test");

server.use(express.json());
server.use(logger("short"));
server.use(helmet());
// server.use(cors());
server.use("/newcomics", newComics);
server.use("/test", testRouter);

module.exports = server;
