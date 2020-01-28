const knex = require("knex");
const knexConfig = require("../knexfile.js");

const environment = process.env.ENVIRONMENT || "development";
const configOptions = knexConfig[environment];

module.exports = knex(configOptions);
