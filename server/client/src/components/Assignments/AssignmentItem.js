import React from "react";
import classes from "./AssignmentItem.module.css";

const AssignmentItem = (props) => {
  return (
    <li
      className={classes["assignment-item"]}
      onClick={() => props.onClick(true, props.id)}
    >
      <div className={classes["assignment-heading"]}>{props.title}</div>
      <div className={classes["assignment-description"]}>
        {props.description}
      </div>
      <div className={classes["due-date"]}>
        <span style={{ fontWeight: "bold" }}>Due Date : </span>
        <span>{props.dueDate}</span>
      </div>
    </li>
  );
};

export default AssignmentItem;
