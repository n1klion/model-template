const store = new Map();

const setConnection = (dbName, connection) => store.set(dbName, connection);

const getConnection = (dbName) => {
  if (!store.has(dbName)) {
    throw new Error(`not found connection in store for ${dbName}`);
  }
  return store.get(dbName);
};

module.exports = { setConnection, getConnection };
