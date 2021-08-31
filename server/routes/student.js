const router = require("express").Router();
const studentControllers = require("../controllers/student");
const isAuth = require("../middleware/auth");

router.put("/create-student", studentControllers.createStudent);
router.post("/join-class", isAuth, studentControllers.joinClass);
router.get("/get-student-classes", isAuth, studentControllers.getClasses);
router.post(
  "/get-student-assignments",
  isAuth,
  studentControllers.getAssignments
);
router.post(
  "/get-student-assignment",
  isAuth,
  studentControllers.getAssignment
);


module.exports = router;
