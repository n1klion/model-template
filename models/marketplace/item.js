const { Schema } = require("mongoose");
const { DB_NAMES } = require("../../constants");
const { getConnection } = require("../../util/connectionStore");

const ItemSchema = new Schema(
  {
    item: {
      type: String,
      required: true
    },
    created: {
      type: Date,
      default: Date.now
    }
  },
  {
    collection: "item"
  });

module.exports.Item = getConnection(DB_NAMES.MARKETPLACE).model("Item", ItemSchema);
