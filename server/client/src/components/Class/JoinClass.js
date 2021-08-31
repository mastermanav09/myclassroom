import React, { useRef, useState, useContext } from "react";
import classes from "./JoinClass.module.css";
import axios from "axios";
import AuthContext from "../../store/auth-context";

const JoinClass = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const inputCodeRef = useRef();

  const authContext = useContext(AuthContext);

  const focusHandler = () => {
    setError(null);
  };

  const joinClassHandler = async (e) => {
    e.preventDefault();
    setError(null);

    if (inputCodeRef.current.value === "") {
      setError("Please enter the code.");
      return;
    }

    try {
      const classId = inputCodeRef.current.value;
      const classCode = {
        classId: classId,
      };

      const res = await axios({
        method: "POST",
        url: "/join-class",
        headers: {
          Authorization: "Bearer " + authContext.token,
        },
        data: classCode,
      });

      if (res.status !== 200) {
        throw new Error("Id is incorrect or you are already joined in!");
      }

      alert("Class Joined successfully!");
      setSuccess(true);
    } catch (err) {
      setError("Id is incorrect or you are already joined in!");
    }

    inputCodeRef.current.value = "";
  };

  return (
    <div className={classes["form-div"]}>
      <form
        className={classes.form}
        onSubmit={joinClassHandler}
        onFocus={focusHandler}
      >
        <div className={classes["form-control"]}>
          <label htmlFor="class-code">Class code : </label>
          <p>Ask your teacher for the class code, then enter it here.</p>
          <input type="text" ref={inputCodeRef} />
          {error && (
            <span style={{ marginTop: "0.5rem", color: "red" }}>{error}</span>
          )}
        </div>

        <button className={classes.btn} onClick={joinClassHandler}>
          Join Class
        </button>
      </form>
    </div>
  );
};

export default JoinClass;
