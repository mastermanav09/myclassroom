import React, { useState, useContext } from "react";
import classes from "./Curriculum.module.css";
import AllAssignments from "../Assignments/AllAssignments";
// import AssignmentInformation from "../Assignments/AssignmentInformation";
import UIContext from "../../store/ui-context";
import CreateAssignment from "../Assignments/CreateAssignment";

const Curriculum = () => {
  const uiContext = useContext(UIContext);

  const [toggleAssignments, setToggleAssignments] = useState(false);



  let assignmentContent = (
    <div className={classes["assignments-main"]}>
      <AllAssignments

        setToggleAssignments={setToggleAssignments}
      />
    </div>
  );


  if (toggleAssignments) {
    assignmentContent = (
      <CreateAssignment setToggleAssignments={setToggleAssignments} />
    );
  }

  return <>{assignmentContent}</>;
};

export default Curriculum;
