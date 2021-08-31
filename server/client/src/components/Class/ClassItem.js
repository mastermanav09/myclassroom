import React, { useContext } from "react";
import classes from "./ClassItem.module.css";
import UIContext from "../../store/ui-context";

const ClassItem = (props) => {
  const uiContext = useContext(UIContext);

  return (
    <li
      key={props.id}
      className={classes["class-item"]}
      onClick={() => {
        uiContext.setCurrentClassId(props.id);
        props.onClick();
      }}
    >
      <div className={classes.main}>
        <div className={classes["card-content"]}>
          <div className={classes.subject}>{props.subject}</div>
          <div className={classes.batch}>{props.batch}</div>
          <div className={classes.teacher}>{props.teacherName}</div>
        </div>
      </div>
    </li>
  );
};

export default ClassItem;
