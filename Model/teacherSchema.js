const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema({
    email: {
      type: String,
      unique: true,
      index: true,
    },
    fullName: String,
    password: String,
    image: String,
  },
  {_id: false});


Schema.plugin(AutoIncrement);
module.exports = mongoose.model("teachers", Schema);