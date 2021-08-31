import React, { useRef, useContext, useState } from "react";
import classes from "./CreateAssignment.module.css";
import UIContext from "../../store/ui-context";
import AuthContext from "../../store/auth-context";
import axios from "axios";

const CreateAssignment = ({ setToggleAssignments }) => {
  const [error, setError] = useState(null);
  const inputTitleRef = useRef();
  const inpuDescriptionRef = useRef();
  const inputDateRef = useRef();

  const authContext = useContext(AuthContext);
  const uiContext = useContext(UIContext);

  const formSubmitHandler = async (e) => {
    setError(null);
    e.preventDefault();

    const title = inputTitleRef.current.value;
    const description = inpuDescriptionRef.current.value;
    const dueDate = inputDateRef.current.value;

    try {
      if (title === "" || description === "" || dueDate === "") {
        return;
      }
      const newAssignment = {
        title: title,
        description: description,
        dueDate: dueDate,
        classId: uiContext.currentClassId,
      };

      const res = await axios({
        method: "POST",
        url: "/create-assignment",
        headers: {
          Authorization: "Bearer " + authContext.token,
        },

        data: newAssignment,
      });

      console.log(res);

      if (res.status !== 200) {
        throw new Error("Creating assignment failed!");
      }

      alert("Created Assignment successfully!");
      setToggleAssignments(false);
    } catch (error) {
      setError("Creating assignment failed!");
    }
  };

  return (
    <>
      <button
        className={classes["back-btn"]}
        onClick={() => setToggleAssignments(false)}
      >
        Back
      </button>
      <div className={classes.main}>
        <form className={classes.form} onSubmit={formSubmitHandler}>
          <div className={classes["form-control"]}>
            <label htmlFor="title">Assignment Title</label>
            <input type="text" ref={inputTitleRef} />
          </div>

          <div className={classes["form-control"]}>
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              cols="40"
              rows="10"
              ref={inpuDescriptionRef}
            ></textarea>
          </div>

          <div className={classes["form-control"]}>
            <label htmlFor="description">Due Date</label>
            <input type="date" ref={inputDateRef} />
          </div>

          <button className={classes.btn}>Create Assignment</button>
        </form>
      </div>
    </>
  );
};

export default CreateAssignment;
