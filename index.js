const mongoose = require("mongoose");
const MongoConnection = require("./util/MongoConnect");
const store = require("./util/connectionStore");

const { DB_NAMES } = require("./constants");

module.exports = {
  mongoose,
  MongoConnection,
  init: MongoConnection.init,
  store,
  DB_NAMES
};
