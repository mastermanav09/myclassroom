const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const classSchema = new Schema({
  subject: {
    type: String,
    required: true,
  },

  batch: {
    type: String,
    required: true,
  },

  teacher: {
    type: Schema.Types.ObjectId,
    ref: "Teacher",
    required: true,
  },

  assignments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Assignment",
      required: true,
    },
  ],

  students: [
    {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
  ],
});

module.exports = mongoose.model("Class", classSchema);
