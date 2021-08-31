import React, { useContext, useRef, useState } from "react";
import axios from "axios";
import classes from "./CreateClass.module.css";
import AuthContext from "../../store/auth-context";

const CreateClass = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [classId, setclassId] = useState(null);
  const inputSubjectRef = useRef();
  const inputBatchRef = useRef();

  const authContext = useContext(AuthContext);

  const createClassHandler = async (e) => {
    e.preventDefault();
    setError(null);

    const subject = inputSubjectRef.current.value;
    const batch = inputBatchRef.current.value;

    try {
      const newClass = {
        subject: subject,
        batch: batch,
      };

      const res = await axios({
        method: "POST",
        url: "/create-class",
        headers: {
          Authorization: "Bearer " + authContext.token,
        },

        data: newClass,
      });

      if (res.status !== 201) {
        throw new Error("Creating a class failed!");
      }

      console.log(res);
      setclassId(res.data.classId);

      setSuccess(true);
    } catch (err) {
      setError(err.message);
    }

    inputSubjectRef.current.value = "";
    inputBatchRef.current.value = "";
  };

  return (
    <div className={classes["form-div"]}>
      <form className={classes.form}>
        <div className={classes["form-control"]}>
          <label htmlFor="subject">Subject Name</label>
          <input type="text" id="subject" ref={inputSubjectRef} />
        </div>

        <div className={classes["form-control"]}>
          <label htmlFor="batch">Batch</label>
          <input type="text" id="batch" ref={inputBatchRef} />
        </div>

        <div className={classes["form-actions"]}>
          <button className={classes.btn} onClick={createClassHandler}>
            Create Class
          </button>
        </div>
      </form>
      {success && classId && (
        <div style={{ textAlign: "center" }}>
          <span>
            <span style={{ color: "rgba(0,0,0,0.6)", margin: "0 0.5rem" }}>
              Share this ID with your students so they can join
            </span>
            {classId}
          </span>
        </div>
      )}
      {error && <span>{error}</span>}
    </div>
  );
};

export default CreateClass;
