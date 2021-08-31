const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema({
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

  classes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },
  ],

  isTeacher: {
    type: Boolean,
    required: false,
  },

  //   teachers: [
  //     {
  //       type: Schema.Types.ObjectId,
  //       ref: "Teacher",
  //       required: true,
  //     },
  //   ],
});

module.exports = mongoose.model("Student", studentSchema);
