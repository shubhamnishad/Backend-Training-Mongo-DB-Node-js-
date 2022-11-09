const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  dob: {
    required: true,
    type: String,
  },
  occupation: {
    required: true,
    type: String,
  },
  status: {
    required: true,
    type: Boolean,
  },
});

module.exports = mongoose.model("Data", dataSchema);
