import React, { useContext, useEffect, useState } from "react";
import PendingAssignments from "./PendingAssignments";
import CompletedAssignments from "./CompletedAssignments";
import classes from "./AllAssignments.module.css";
import AuthContext from "../../store/auth-context";
import AssignmentInformation from "../Assignments/AssignmentInformation";
import UIContext from "../../store/ui-context";
import axios from "axios";

const AllAssignments = (props) => {
  const authContext = useContext(AuthContext);
  const uiContext = useContext(UIContext);
  const [isGetting, setIsGetting] = useState(true);
  const [assignments, setAssignments] = useState([]);
  const [showAssignmentInform, setShowAssignmentInform] = useState(false);
  const [assignment, setassignment] = useState({});

  // const [completedAssignments, setCompletedAssignments] = useState([])

  useEffect(() => {
    const getAssignments = async () => {
      try {
        const classCode = {
          classId: uiContext.currentClassId,
        };

        const res = await axios({
          url: "/get-student-assignments",
          method: "POST",

          headers: {
            Authorization: "Bearer " + authContext.token,
          },

          data: classCode,
        });
        console.log(res);

        if (res.status !== 200) {
          throw new Error();
        }

        setAssignments(res.data.assignments);
      } catch (err) {
        console.log("Fetching assignments failed!");
      }

      setIsGetting(false);
    };

    getAssignments();
  }, [uiContext.currentClassId, authContext.token]);

  if (isGetting) {
    return <p className="center">Loading...</p>;
  }

  const assignmentInformHandler = async (value, id) => {
    try {
      const assignmentId = {
        assignId: id,
      };

      const res = await axios({
        url: "/get-student-assignment",
        method: "POST",
        headers: {
          Authorization: "Bearer " + authContext.token,
        },

        data: assignmentId,
      });

      console.log(res);

      if (res.status !== 200) {
        throw new Error();
      }

      setassignment(res.data.assignment);

      setShowAssignmentInform(value);
    } catch (error) {
      console.log("Fetching assignment information failed!");
    }
  };

  const assignmentInformToggle = (value) => {
    setShowAssignmentInform(value);
  };

  const pendingAS = assignments.map((a) => {
    const date = new Date(a.dueDate).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    return {
      ...a,
      dueDate: date,
    };
  });

  let assignmentContent = (
    <div className={classes.main}>
      <div className={classes["curriculum-options"]}>
        <span>Assignments</span>
        <span>Tests</span>
        <button
          className={classes.btn}
          onClick={() => {
            uiContext.setShowCurriculum(false);
          }}
        >
          Back
        </button>
      </div>

      <hr />

      <div style={{ padding: "1rem 1rem" }}>
        {authContext.userAuth && (
          <button
            className={classes.btn}
            onClick={() => props.setToggleAssignments(true)}
          >
            Create Assignment
          </button>
        )}

        <PendingAssignments
          onClick={assignmentInformHandler}
          pendingAS={pendingAS}
        />
        {/* <CompletedAssignments onClick={props.click} /> */}
      </div>
    </div>
  );

  if (showAssignmentInform) {
    assignmentContent = (
      <AssignmentInformation
        {...assignment}
        assignmentInformHandler={assignmentInformHandler}
        assignmentInformToggle={assignmentInformToggle}
        // click={assignmentInformHandler}
        setToggleAssignments={props.setToggleAssignments}
      />
    );
  }

  return <> {assignmentContent} </>;
};

export default AllAssignments;
