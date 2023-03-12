const mongoose = require("mongoose");
const { setConnection } = require("./connectionStore");
const { DB_NAMES } = require("../constants");

const AVAILABLE_DB_NAMES = Object.values(DB_NAMES);

class MongoConnection {
  constructor(uri, dbName, logger) {
    if (!uri) {
      throw new Error("connection string is required");
    }
    this.uri = uri;
    if (!logger) {
      throw new Error("logger is required");
    }
    this.log = logger;
    if (!AVAILABLE_DB_NAMES.includes(dbName)) {
      throw new Error(`current db name: ${dbName} not found in available`);
    }
    this.dbName = dbName;
  }

  static init = (uri, dbName, logger) => {
    const instance = new MongoConnection(uri, dbName, logger);
    instance.createConnection();
    return instance;
  };

  addModels() {
    setConnection(this.dbName, this.connection);
  }

  addCustomModel(name, schema) {
    this.connection.model(name, schema);
  }

  createConnection() {
    this.connection = mongoose.createConnection(this.uri);
    this.connection.on("error", (err) => {
      this.log.error(`Mongo connection error at ${this.dbName}: ${err}`);
      this.log.error(err);
    });
    this.connection.on("disconnecting", () => {
      this.log.debug("Emitted disconnecting!");
    });
    this.connection.on("disconnected", () => {
      this.log.warn("Mongo disconnected.");
    });
    this.connection.on("reconnected", () => {
      this.log.warn("A mongo was reconnected!");
    });
    this.connection.on("close", () => {
      this.log.info("Mongo connection closed!");
    });
    this.connection.on("connected", () => {
      this.log.info("Mongo connected");
    });
    this.addModels();
  }

  async createConnectionAsync() {
    if (this.connection) {
      await this.connection.openUri(this.uri);
      return;
    }

    this.connection = await mongoose.createConnection(this.uri).asPromise();
    this.connection.on("error", (err) => {
      this.log.error(`Mongo connection error at ${this.dbName}: ${err}`);
      this.log.error(err);
    });
    this.connection.on("disconnecting", () => {
      this.log.debug("Emitted disconnecting!");
    });
    this.connection.on("disconnected", () => {
      this.log.warn("Mongo disconnected.");
    });
    this.connection.on("reconnected", () => {
      this.log.warn("A mongo was reconnected!");
    });
    this.connection.on("close", () => {
      this.log.info("Mongo connection closed!");
    });
    this.connection.on("connected", () => {
      this.log.info("Mongo connected");
    });
    this.addModels();
  }

  async disconnect() {
    this.connection?.removeAllListeners();
    await this.connection?.close();
  }
}

module.exports = MongoConnection;
