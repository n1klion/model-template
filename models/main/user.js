const { Schema } = require("mongoose");
const { DB_NAMES } = require("../../constants");
const { getConnection } = require("../../util/connectionStore");

const UserSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true
    },
    created: {
      type: Date,
      default: Date.now
    }
  },
  {
    collection: "user"
  });

module.exports.User = getConnection(DB_NAMES.MAIN).model("User", UserSchema);
