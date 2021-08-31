const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
  username: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    min: 8,
  },

  isTeacher: {
    type: Boolean,
    required: true,
  },

  classes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },
  ],
});

module.exports = mongoose.model("Teacher", teacherSchema);
