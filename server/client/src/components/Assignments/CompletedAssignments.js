import React from "react";
import classes from "./CompletedAssignments.module.css";
import AssignmentItem from "./AssignmentItem";

const CompletedAssignments = (props) => {
  return (
    <div className={classes.main}>
      <span style={{ fontWeight: "bold", fontFamily: "sans-serif" }}>
        Completed
      </span>
      <ul className={classes["completed-assignments_list"]}>
        <AssignmentItem onClick={props.onClick} />
        <AssignmentItem onClick={props.onClick} />
        <AssignmentItem onClick={props.onClick} />
      </ul>
    </div>
  );
};

export default CompletedAssignments;
