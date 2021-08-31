import React from "react";
import classes from "./PendingAssignments.module.css";
import AssignmentItem from "./AssignmentItem";

const PendingAssignments = (props) => {
  return (
    <div className={classes.main}>
      {props.pendingAS.length === 0 ? (
        <h1 style={{ textAlign: "center" }}>No Assignments</h1>
      ) : (
        <>
          <span style={{ fontWeight: "bold", fontFamily: "sans-serif" }}>
            Pending
          </span>

          <ul className={classes["pending-assignments_list"]}>
            {props.pendingAS.map((assignment) => (
              <AssignmentItem
                key={assignment._id}
                id={assignment._id}
                title={assignment.title}
                description={assignment.description}
                dueDate={assignment.dueDate}
                marks={assignment.marks}
                onClick={props.onClick}
              />
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default PendingAssignments;
