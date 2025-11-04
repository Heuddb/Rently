const mongoose = require("mongoose");

const HomeSchema = new mongoose.Schema({
  name: { type: String, require: true },
  house_no: { type: String, require: true },
  price: { type: Number, require: true },
  rooms: { type: String, require: true },
  address: { type: String, require: true },
  photo: { type: String, require: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Home", HomeSchema);
