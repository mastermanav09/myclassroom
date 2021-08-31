const router = require("express").Router();
const teacherControllers = require("../controllers/teacher");
const isAuth = require("../middleware/auth");

router.put("/create-teacher", teacherControllers.createTeacher);
router.post("/create-class", isAuth, teacherControllers.createClass);
router.get("/get-teacher-classes", isAuth, teacherControllers.getClasses);
router.post("/create-assignment", isAuth, teacherControllers.createAssignment);

module.exports = router;
