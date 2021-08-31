const express = require("express");
const app = express();
const Teacher = require("./models/Teacher");
const Student = require("./models/Student");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const studentRoutes = require("./routes/student");
const teacherRoutes = require("./routes/teacher");
const isAuth = require("./middleware/auth");
require("dotenv").config();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./assignments");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
  },
});

app.use(express.json());
app.use(multer({ storage: fileStorage }).single("file"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, DELETE, PATCH"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "origin, Authorization, Content-Type"
  );

  next();
});

app.post("/login", async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    let user = await Teacher.findOne({ email: email });
    if (!user) {
      user = await Student.findOne({ email: email });

      if (!user) {
        const error = new Error("User not found.");
        error.statusCode = 422;
        throw error;
      }
    }

    loadedUser = user;
    const isEqual = await bcrypt.compare(password, user.password);

    if (!isEqual) {
      const error = new Error("Wrong password.");
      error.statusCode = 422;
      throw error;
    }

    const token = jwt.sign(
      {
        email: loadedUser.email,
        userId: loadedUser._id.toString(),
      },
      "5waAb9RPup6Vk0q",
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({
      token: token,
      userId: loadedUser._id.toString(),
      userAuth: loadedUser.isTeacher,
    });

    return;
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
});

app.post("/single", isAuth, (req, res, next) => {
  console.log(req.file);
  res.status(200).json({
    message: "Work uploaded successfully.",
  });
});

app.use(studentRoutes);
app.use(teacherRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  // const errorData = error.data;
  res.status(status).json({
    message: message,
    // data: errorData,
  });
});

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.log(err));

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "client", "build")));
// }

app.listen(process.env.PORT || 8080, () => {
  console.log("Backend server is running!");
});
