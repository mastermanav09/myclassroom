import React, { useEffect, useContext, useState } from "react";
import Curriculum from "../Curriculum/Curriculum";
import classes from "./AllClasses.module.css";
import ClassList from "./ClassList";
import UIContext from "../../store/ui-context";
import AuthContext from "../../store/auth-context";
import axios from "axios";

const AllClasses = () => {
  const uiContext = useContext(UIContext);
  const authContext = useContext(AuthContext);
  const [myClasses, setMyClasses] = useState([]);
  const [isGetting, setIsGetting] = useState(true);
  const [didGot, setDidGot] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  console.log("bahar", authContext.userAuth);

  useEffect(() => {
    const getClasses = async () => {
      setError(null);
      try {
        let getUrl = "/get-student-classes";

        console.log(authContext.userAuth);
        if (authContext.userAuth) {
          getUrl = "/get-teacher-classes";
        }

        const res = await axios({
          method: "GET",
          url: getUrl,

          headers: {
            Authorization: "Bearer " + authContext.token,
          },
        });

        console.log(res);

        if (res.status !== 200) {
          throw new Error();
        }

        if (authContext.userAuth) {
          setMyClasses(res.data.teacherClasses);
        } else {
          setMyClasses(res.data.studentRealClasses);
        }
        setSuccess(true);
      } catch (err) {
        console.log(err);
      }

      setIsGetting(false);
    };

    getClasses();
  }, [authContext.userAuth, authContext.token]);

  if (isGetting) {
    console.log("imside llfdoang");
    return <p className="center">Loading...</p>;
  }

  console.log("after loafingfr");
  const showCurriculumHandler = () => {
    uiContext.setShowCurriculum(true);
  };

  let content = (
    <div className={classes["all-classes"]}>
      <div className={classes["your_class-heading"]}>
        <h2>My Classes</h2>
        <hr />
      </div>
      <div className={classes["classes_main"]}>
        <ClassList onClick={showCurriculumHandler} myClasses={myClasses} />
      </div>
    </div>
  );

  if (uiContext.showCurriculum) {
    content = <Curriculum />;
  }

  return <>{content}</>;
};

export default AllClasses;
