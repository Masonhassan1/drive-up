const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const driveSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: 2,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Drive = mongoose.model("Drive", driveSchema);

module.exports = Drive;
