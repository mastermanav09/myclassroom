const Teacher = require("../models/Teacher");
const Class = require("../models/Class");
const bcrypt = require("bcrypt");
const Assignment = require("../models/Assignment");

exports.createTeacher = async (req, res, next) => {
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;

  try {
    const hashedPw = await bcrypt.hash(password, 12);

    const user = new Teacher({
      email: email,
      password: hashedPw,
      username: username,
      classes: [],
      isTeacher: true,
    });

    const result = await user.save();

    res.status(201).json({
      message: "Teacher account created successfully.",
      userId: result._id,
      userAuth: result.isTeacher,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }

    next(err);
  }
};

exports.createClass = async (req, res, next) => {
  try {
    const subject = req.body.subject;
    const batch = req.body.batch;

    const user = await Teacher.findOne({ _id: req.userId });

    if (!user) {
      const error = new Error("Invalid User!");
      error.statusCode = 422;
      throw error;
    }

    const newClass = new Class({
      subject: subject,
      batch: batch,
      teacher: req.userId,
      assignments: [],
      students: [],
    });

    const result = await newClass.save();

    const updatedClasses = [...user.classes, result._id];
    user.classes = updatedClasses;

    await user.save();

    res.status(201).json({
      message: "Class created successfully.",
      classId: result._id,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }

    next(err);
  }
};

exports.getClasses = async (req, res, next) => {
  const id = req.userId;
  //req.id
  console.log(id);
  try {
    const teacherClasses = await Teacher.findOne({ _id: id })
      .populate("classes")
      .select("-password -email -isTeacher");

    if (!teacherClasses) {
      const error = new Error("Invalid User!");
      error.statusCode = 422;
      throw error;
    }

    console.log("teacher", teacherClasses);

    res.status(200).json({
      teacherClasses,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }

    next(err);
  }
};

exports.createAssignment = async (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;
  const dueDate = req.body.dueDate;
  const classId = req.body.classId;

  try {
    if (
      title === undefined ||
      description === undefined ||
      dueDate === undefined
    ) {
      const error = new Error("Wrong Input");
      error.statusCode = 422;
      throw error;
    }

    const assignClass = await Class.findOne({ _id: classId });

    if (!assignClass) {
      const error = new Error("Class not found");
      throw error;
    }

    const newAssignment = new Assignment({
      title: title,
      description: description,
      dueDate: dueDate,
      marks: null,
      classId: classId,
    });

    const updatedAssignments = [...assignClass.assignments, newAssignment];
    assignClass.assignments = updatedAssignments;

    await newAssignment.save();
    await assignClass.save();

    res.status(200).json({
      message: "Assignment created successfully",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }

    next(err);
  }
};
