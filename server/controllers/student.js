const Student = require("../models/Student");
const Class = require("../models/Class");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Assignment = require("../models/Assignment");

exports.createStudent = async (req, res, next) => {
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;

  try {
    const hashedPw = await bcrypt.hash(password, 12);

    const user = new Student({
      email: email,
      password: hashedPw,
      username: username,
      classes: [],
      isTeacher: false,
    });

    const result = await user.save();

    res.status(201).json({
      message: "Student account created successfully.",
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

exports.joinClass = async (req, res, next) => {
  const classId = req.body.classId;

  try {
    const existingClass = await Class.findOne({
      _id: classId,
    });

    if (!existingClass) {
      const error = new Error("No class found!");
      error.statusCode = 422;
      throw error;
    }

    const id = req.userId;

    const existingStudent = existingClass.students.find(
      (studentId) => studentId.toString() === id.toString()
    );

    if (existingStudent) {
      const error = new Error("Already Joined!");
      error.statusCode = 422;
      throw error;
    }

    const updatedStudents = [...existingClass.students, id];

    existingClass.students = updatedStudents;

    await existingClass.save();

    const student = await Student.findOne({ _id: id });

    if (!student) {
      const error = new Error("Invalid User!");
      error.statusCode = 422;
      throw error;
    }

    const updatedClasses = [...student.classes, classId];
    student.classes = updatedClasses;
    await student.save();

    res.status(200).json({
      message: "Class joined successfully.",
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

  try {
    const studentClasses = await Student.findOne({ _id: id })
      .populate("classes")
      .populate({
        path: "classes",
        populate: {
          path: "teacher",
          model: "Teacher",
        },
      })
      .select("-email -password");

    if (!studentClasses) {
      const error = new Error("Invalid User!");
      error.statusCode = 422;
      throw error;
    }

    const studentRealClasses = studentClasses._doc.classes.map((c) => {
      return {
        _id: c._id,
        batch: c.batch,
        subject: c.subject,
        teacher: {
          username: c.teacher.username,
        },
      };
    });

    res.status(200).json({
      studentRealClasses,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }

    next(err);
  }
};

exports.getAssignments = async (req, res, next) => {
  const classId = req.body.classId;
  console.log(classId);

  try {
    const classAssign = await Class.findOne({ _id: classId }).populate(
      "assignments"
    );

    if (!classAssign) {
      const error = new Error("Class not found!");
      throw error;
    }

    const assignments = classAssign.assignments;

    res.status(200).json({
      assignments,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }

    next(err);
  }
};

exports.getAssignment = async (req, res, next) => {
  const assignId = req.body.assignId;

  try {
    const assignment = await Assignment.findOne({ _id: assignId });
    if (!assignment) {
      const error = new Error("Assignment not found!");
      throw error;
    }

    res.status(200).json({
      assignment,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }

    next(err);
  }
};
