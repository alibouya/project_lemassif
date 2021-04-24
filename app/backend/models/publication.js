const mongoose = require("mongoose");
const comment = require("./comment");
// const message = require("./message");

const Schema = mongoose.Schema;
const PublicationSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },

  marque: {
    type: String,
    enum: [
      "Salons",
      "Tables",
      "Meubles TV",
      "Chambres à Coucher",
      "Cuisines",
      "Divers"
    ],
    require: true
  },

  // price: {
  //   type: Number,
  //   require: true
  // },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
    }
  ],

  Comments: [comment],
  date: {
    type: Date,
    default: Date.now
  }
  // Messages: [message],
  // date: {
  //   type: Date,
  //   default: Date.now
  // }
});
module.exports = mongoose.model("Publication", PublicationSchema);
