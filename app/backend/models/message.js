const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const MessageSchema = new Schema({
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User"
  // },
  name: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  text: {
    type: String,
    required: true
  },

  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model("Message", MessageSchema);
