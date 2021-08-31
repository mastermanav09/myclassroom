import React, { useContext } from "react";
import ClassItem from "./ClassItem";
import classes from "./ClassList.module.css";
import AuthContext from "../../store/auth-context";

const ClassList = (props) => {
  const authContext = useContext(AuthContext);

  if (authContext.userAuth) {
    return (
      <>
        {props.myClasses.classes.length === 0 ? (
          <>
            <h1 style={{ textAlign: "center" }}>No Classes</h1>
          </>
        ) : (
          <ul className={classes["class-list"]}>
            {props.myClasses.classes.map((cls) => (
              <ClassItem
                id={cls._id}
                key={cls._id}
                onClick={props.onClick}
                subject={cls.subject}
                batch={cls.batch}
                teacherName={props.myClasses.username}
              />
            ))}
          </ul>
        )}
      </>
    );
  }

  return (
    <>
      {props.myClasses.length === 0 ? (
        <>
          <h1 style={{ textAlign: "center" }}>No Classes</h1>
        </>
      ) : (
        <ul className={classes["class-list"]}>
          {props.myClasses.map((cls) => (
            <ClassItem
              id={cls._id}
              key={cls._id}
              onClick={props.onClick}
              subject={cls.subject}
              batch={cls.batch}
              teacherName={cls.teacher.username}
            />
          ))}
        </ul>
      )}
    </>
  );
};

export default ClassList;
